import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum SensorType {
  Temperature = 'temperature',
  Humidity = 'humidity',
  WindSpeed = 'windSpeed',
  WindDirection = 'windDirection',
  PH = 'pH',
}

export class CreateSensorDataDto {
  @IsNotEmpty()
  @IsString()
  sensorId: string;

  @IsEnum(SensorType)
  type: SensorType;

  @IsNumber()
  value: number;

  @IsDateString()
  timestamp: string;
}