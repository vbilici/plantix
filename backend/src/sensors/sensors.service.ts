import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { SensorsGateway } from './sensors.gateway'; // Import the SensorsGateway

@Injectable()
export class SensorsService {
  private readonly logger = new Logger(SensorsService.name);

  constructor(private prisma: PrismaService, private sensorsGateway: SensorsGateway) {} 

  async create(createSensorDataDto: CreateSensorDataDto) {
    try {
      const createdData = await this.prisma.sensorData.create({
        data: createSensorDataDto,
      });
      this.logger.log(`Sensor data created with ID: ${createdData.id}`);
      this.sensorsGateway.broadcastData(createdData);
      return createdData;
    } catch (error:any) {
      this.logger.error('Error creating sensor data', error.message, error.stack);
      throw error;
    }
  }

  // Finds the most recent sensor data from each sensor type
  async findRecent() {
    try {
      /* this could be done as
      SELECT DISTINCT ON (type) * FROM "SensorData" ORDER BY type, timestamp DESC
      in Postgres but SQlite does not support DISTINCT ON
      */
      const recentItems = await this.prisma.$queryRaw`SELECT * FROM SensorData WHERE (type, timestamp) IN (SELECT type, MAX(timestamp) as maxtimestamp FROM SensorData GROUP BY type)`;

      this.logger.log('Retrieved latest sensor data entries');
      return recentItems
    } catch (error:any) {
      this.logger.error('Error retrieving sensor data', error.message, error.stack);
      throw error;
    }
  }
}