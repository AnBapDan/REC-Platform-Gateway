import { Body, Controller, OnModuleInit, Post, ValidationPipe } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { TRANSACTIONS_SERVICE_NAME, TransactionsServiceClient } from 'src/typescript/transactions.pb';
import { grpcClientTransactionsOptions } from './transactions.connection';
import { firstValueFrom } from 'rxjs';
import { DeviceInfoDTO, ListReceiptsDTO } from 'src/dto/transactions.dto';

@Controller('transactions')
export class TransactionsController implements OnModuleInit{
    @Client(grpcClientTransactionsOptions)
    private readonly transactions: ClientGrpc;
    private transactionsService: TransactionsServiceClient;
  
    onModuleInit() {
      this.transactionsService =
        this.transactions.getService<TransactionsServiceClient>(TRANSACTIONS_SERVICE_NAME);
    }

    @Post('receipts')
    async sendReceipts(@Body(new ValidationPipe()) entry: ListReceiptsDTO){
        console.log(entry)
        return await firstValueFrom(this.transactionsService.addTxReceipt(entry));
    }

    @Post('account')
    async createAccount(@Body(new ValidationPipe()) entry: DeviceInfoDTO){
        console.log(entry)
        return await firstValueFrom(this.transactionsService.addAccount(entry));
    }
    
}
