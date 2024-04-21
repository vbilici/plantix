import axios from 'axios';

interface SensorData {
  sensorId: string;
  type: string;
  value: number;
  timestamp: string;
}

export const fetchSensorData = async (): Promise<SensorData[]> => {
  try {
    const host = import.meta.env.VITE_API_URL;
    const url = `${host}/sensors/data`
    const response = await axios.get<SensorData[]>(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch sensor data');
  }
};