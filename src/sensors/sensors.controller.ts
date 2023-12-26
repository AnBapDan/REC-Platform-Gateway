import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Post,
  Query,
} from "@nestjs/common";
import { grpcClientSensorsOptions } from "./sensors.connection";

import { Client, ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { QueryResponse, SENSOR_SERVICE_NAME, SensorEntry, SensorResponse, SensorServiceClient } from "src/typescript/sensors.pb";

@Controller("parking")
export class SensorsController implements OnModuleInit {
  @Client(grpcClientSensorsOptions)
  private readonly sensors: ClientGrpc;
  private sensorService: SensorServiceClient;

  onModuleInit() {
    this.sensorService =
      this.sensors.getService<SensorServiceClient>(SENSOR_SERVICE_NAME);
  }

  @Get("latest")
  async retrieveLatestEntries(): Promise<QueryResponse> {
    return await firstValueFrom(this.sensorService.retrieveLatestEntries({}));
  }

  @Get("")
  async retrieveEntry(@Query() query: any): Promise<QueryResponse> {
    return await firstValueFrom(this.sensorService.retrieveEntry(query));
  }

  @Post("")
  async addEntry(@Body() entry: any): Promise<SensorResponse> {
    let ts = new Date(entry.data.received_at).getTime()
    
    let formatedEntry: SensorEntry = {
      deviceId: entry.data.end_device_ids.device_id,
      parkingStatus: entry.data.uplink_message.decoded_payload.parking_status,
      timestamp: Math.floor(ts/1000).toString()
    };
    
    return await firstValueFrom(this.sensorService.addEntry(formatedEntry));
  }
}
