import { useEffect, useState, FC } from 'react';
import { io, Socket } from 'socket.io-client';
import { fetchSensorData } from '../utils/dataFetcher';
import SensorDataTable from './SensorDataTable';

interface SensorData {
  sensorId: string;
  type: string;
  value: number;
  timestamp: string;
}

const SensorDataDashboard: FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSensorData(); 
        setSensorData(data);
      } catch (error: any) {
        console.error('Error fetching sensor data:', error.message, error.stack);
      }
    };

    fetchData();

    // Establish WebSocket connection
    const socket: Socket = io(import.meta.env.VITE_API_URL);

    socket.on('connect', () => {
      console.log('Dashboard WebSocket connected');
    })


    // Listen for real-time updates
    socket.on('sensorData', (newData: SensorData[]) => {
      console.log('Received new sensor data 1', newData);

      if (Array.isArray(newData)) {
        setSensorData((prevData) => {
          const updatedData = prevData.map((data) => {
              const newDataEntry = newData.find((newItem) => newItem.type === data.type);
              return newDataEntry || data;
          });
          return updatedData;
        });
        console.log('Received new sensor data', newData);
      } else {
        console.error('Received data is not in expected array format:', newData);
      }
    });

    return () => {
      socket.disconnect();
      console.log('WebSocket disconnected');
    };
  }, []);

  return (<SensorDataTable sensorData={sensorData} />);
};

export default SensorDataDashboard;