import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Client, ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable, timeout } from "rxjs";
import { AuthGuard } from "../auth/auth.guard";
import { grpcClientMetersOptions } from "./meters.connection";
import {
  MeterEntry,
  MetersServiceClient,
  METERS_SERVICE_NAME,
  QueryMeters,
  QueryResponse,
  MeterResponse,
} from "src/typescript/meters.pb";

@Controller("meters")
export class MetersController implements OnModuleInit {
  @Client(grpcClientMetersOptions)
  private readonly meters: ClientGrpc;
  private metersService: MetersServiceClient;

  onModuleInit() {
    this.metersService =
      this.meters.getService<MetersServiceClient>(METERS_SERVICE_NAME);
  }

  @Post("measurement")
  //@UseGuards(AuthGuard)
  async addMeasurement(@Body() entry: MeterEntry): Promise<MeterResponse> {
    return await firstValueFrom(this.metersService.addMeasurement(entry))
  }

  @Get("measurement")
  async retrieveMeasurement(
    @Query() entry: QueryMeters
  ): Promise<QueryResponse> {
    return await firstValueFrom(this.metersService.retrieveMeasurement(entry));
    
  }
}
