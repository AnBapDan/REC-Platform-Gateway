import { ClientOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'src/typescript/meters.pb';

export const grpcClientMetersOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'meters:5049',
    package: protobufPackage,
    protoPath: 'node_modules/grpc-protos/proto/meters.proto',
  },
};
