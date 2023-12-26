import { ClientOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'src/typescript/transactions.pb';

export const grpcClientTransactionsOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'transactions:5055',
    package: protobufPackage,
    protoPath: 'node_modules/grpc-protos/proto/transactions.proto',
  },
};
