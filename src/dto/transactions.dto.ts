import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { DeviceInfo, IssuerId, JsonReceipt, ListReceipts } from "src/typescript/transactions.pb";

export class DeviceInfoDTO implements DeviceInfo{
    @IsNotEmpty()
    @IsString()
    pubkey: string;
    @IsNotEmpty()
    @IsString()
    deviceId: string;

}

export class ListReceiptsDTO implements ListReceipts{
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => JsonReceiptDTO)
    receipts: JsonReceiptDTO[];

}

export class JsonReceiptDTO implements JsonReceipt{
    @IsNotEmpty()
    @IsString()
    paymentID: string;
    @IsString()
    @IsNotEmpty()
    txID: string;

} 

export class IssuerIdDTO implements IssuerId{
    @IsNotEmpty()
    @IsString()
    id: string;
}