import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_SERVICE_NAME, protobufPackage } from "src/typescript/auth.pb";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "auth:5050",
          package: protobufPackage,
          protoPath: "node_modules/grpc-protos/proto/auth.proto"
        },
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
