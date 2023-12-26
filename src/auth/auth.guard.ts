import { CanActivate, ConflictException, ExecutionContext, HttpException, Injectable,  } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { ValidateRequest } from "src/typescript/auth.pb";


@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(public readonly service: AuthService){}

    public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
        const req : Request = ctx.switchToHttp().getRequest();
        const authorization : string = req.headers['authorization'];
        const timestamp : string = req.headers['timestamp'];
        const deviceid : string = req.headers['deviceid'];
        
        if(req.body['deviceId'] !== deviceid){
            throw new ConflictException()
        }
        //if(!authorization || !timestamp || !deviceId) throw new UnauthorizedException();
        const payload : ValidateRequest = {authorization,timestamp,deviceid}

        console.log(payload)
        const {status, error} = await this.service.validate(payload);

        if(error){
            throw new HttpException(error[0], status);
        }
        return true;

        
    }
}