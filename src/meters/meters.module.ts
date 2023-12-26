import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MetersController } from './meters.controller';

@Module({
  imports:[AuthModule],
  controllers: [MetersController]
})
export class MetersModule {}
