import { Module } from '@nestjs/common';
import { SensorsGateway } from "./sensors.gateway";
import { SensorsService } from './sensors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SensorsController } from './sensors.controller';

@Module({
  providers: [SensorsGateway,SensorsService, PrismaService],
  controllers: [SensorsController],
  exports: [SensorsService]
})
export class SensorsModule {}