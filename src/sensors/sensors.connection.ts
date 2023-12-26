import { ClientOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'src/typescript/sensors.pb';

export const grpcClientSensorsOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'sensors:5052',
    package: protobufPackage,
    protoPath: 'node_modules/grpc-protos/proto/sensors.proto',
  },
};
