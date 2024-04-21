import { Body, Controller, Get, Post, Logger } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';

@Controller('sensors/data')
export class SensorsController {
  private readonly logger = new Logger(SensorsController.name);

  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  async create(@Body() createSensorDataDto: CreateSensorDataDto) {
    try {
      this.logger.log(`Creating sensor data: ${JSON.stringify(createSensorDataDto)}`);
      const createdData = await this.sensorsService.create(createSensorDataDto);
      return createdData;
    } catch (error:any) {
      this.logger.error(`Error creating sensor data: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get()
  async findRecent() {
    try {
      this.logger.log('Fetching the latest sensor data for each type');
      const data = await this.sensorsService.findRecent();
      return data;
    } catch (error:any) {
      this.logger.error(`Error fetching sensor data: ${error.message}`, error.stack);
      throw error;
    }
  }
}