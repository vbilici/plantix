import { Test, TestingModule } from '@nestjs/testing';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { PrismaService } from '../prisma/prisma.service';
import { SensorsGateway } from './sensors.gateway';
import { CreateSensorDataDto, SensorType } from './dto/create-sensor-data.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

class MockSensorsService {
  async create(dto: CreateSensorDataDto) {
    return {
      ...dto,
      id: Date.now(), // Mocking an auto-generated ID
    };
  }

  async findRecent() {
    return [
      { sensorId: 'sensor-temperature-1', type: SensorType.Temperature, value: 25.5, timestamp: new Date().toISOString() },
    ];
  }
}

class MockSensorsGateway {
  broadcastData(data: any) {
    // Mock implementation
  }
}

describe('SensorsController', () => {
  let controller: SensorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [
        {
          provide: SensorsService,
          useClass: MockSensorsService,
        },
        SensorsGateway,
        PrismaService,
      ],
    })
    .overrideProvider(SensorsGateway)
    .useClass(MockSensorsGateway)
    .compile();

    controller = module.get<SensorsController>(SensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /sensors/data', () => {
    it('should create sensor data', async () => {
      const dto: CreateSensorDataDto = {
        sensorId: 'sensor-temperature-1',
        type: SensorType.Temperature,
        value: 25.5,
        timestamp: new Date().toISOString(),
      };

      expect(await controller.create(dto)).toEqual({
        ...dto,
        id: expect.any(Number),
      });
    });

    // We could add more tests here for invalid data, error handling, etc.
  });

  describe('GET /sensors/data', () => {
    it('should return an array of sensor data', async () => {
      const result = await controller.findRecent();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1); // Adjust based on mock data
      expect(result[0].type).toBe(SensorType.Temperature);
    });

    // same here, we could add more tests for error handling, etc.
  });
});