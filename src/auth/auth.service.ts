import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {AUTH_SERVICE_NAME, AuthServiceClient, ValidateRequest, ValidateResponse} from "src/typescript/auth.pb"

@Injectable()
export class AuthService {
  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;
  private service: AuthServiceClient;
  public onModuleInit(): void {
    this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validate(req: ValidateRequest): Promise<ValidateResponse> {
    return await firstValueFrom(this.service.validate(req));
  }
}
