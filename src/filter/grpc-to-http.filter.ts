import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Request, Response } from "express";

import { Metadata, status } from "@grpc/grpc-js";
import { ErrorStatusMapper } from "src/utils/error-status-mapper";

interface CustomExceptionDetails {
  type: string;
  details: string;
  domain: string;
  metadata: { service: string };
}
interface CustomException<T> {
  code: status;
  details: T;
  metadata: Metadata;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    // **You can log your exception details here**
    // log exception (custom-logger)
    // const loggerService: LoggerService<CustomExceptionDetails> =
    //   new LoggerService(FeatureService["CLIENT/UserAccountService"]);

    // loggerService.log(<LogData<CustomExceptionDetails>>{
    //   type: LogType.ERROR,
    //   data: details,
    // });

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const request = ctx.getRequest<Request>();

    const mapper = new ErrorStatusMapper();
    //console.log("CODE ->  " +exception.code)
    const status = mapper.grpcToHttpMapper(exception.code);
    const type = HttpStatus[status];
    console.log("[Gateway]: Requested - "+ request.url+"; Got - "+type)
    response.status(status).json({
      statusCode: status,
      error: type,
    });
  }
}
