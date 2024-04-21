import axios from 'axios';
import { SensorType } from '../sensors/dto/create-sensor-data.dto';

const SENSOR_API_ENDPOINT = 'http://localhost:3001/sensors/data'; 

const generateRandomData = (type: SensorType) => {
  switch (type) {
    case SensorType.Temperature:
      return +(Math.random() * 30 + 10).toFixed(2); // 10°C to 40°C
    case SensorType.Humidity:
      return +(Math.random() * 100).toFixed(2); // 0% to 100%
    case SensorType.WindSpeed:
      return +(Math.random() * 15).toFixed(2); // 0 to 15 m/s
    case SensorType.WindDirection:
      return Math.floor(Math.random() * 360); // 0° to 360°
    case SensorType.PH:
      return +(Math.random() * 14).toFixed(2); // 0 to 14
    default:
      return 0;
  }
};

const generateAndSendData = async () => {
  // Let's assume there is one sensor for each type
  for (const typeId in SensorType) {
    const type = SensorType[typeId];
    const data = {
      sensorId: `sensor-${type}-1`,
      type,
      value: generateRandomData(type),
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(SENSOR_API_ENDPOINT, data);
      console.log(`Data sent for ${type}: `, data);
    } catch (error) {
      console.error(`Error sending data for ${type}: `, error.response ? error.response.data : error.message, error.stack);
    }
  }
};

setInterval(generateAndSendData, 5000);