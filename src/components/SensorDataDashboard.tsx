import { useEffect, useState, FC } from 'react';
import { io, Socket } from 'socket.io-client';
import SensorDataTable from './SensorDataTable';
import SensorDataForm from './SensorDataForm';
import axios from 'axios';

export interface SensorData {
  sensorId: string;
  type: string;
  value: number;
  timestamp: string;
}
const host = import.meta.env.VITE_API_URL;
const url = `${host}/sensors/data`


const SensorDataDashboard: FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<SensorData[]>(url);
        const data = result.data
        setSensorData(data);
      } catch (error: any) {
        console.error('Error fetching sensor data:', error.message, error.stack);
      }
    };

    fetchData();

    // Establish WebSocket connection
    const socket: Socket = io(host);

    socket.on('connect', () => {
      console.log('Dashboard WebSocket connected');
    })


    // Listen for real-time updates
    socket.on('sensorData', (newData: SensorData[]) => {


      if (Array.isArray(newData)) {
        setSensorData((prevData) => {
          const updatedData = prevData.map((data) => {
              const newDataEntry = newData.find((newItem) => newItem.type === data.type);
              return newDataEntry || data;
          });
          return updatedData;
        });
      } else {
        console.error('Received data is not in expected array format:', newData);
      }
    });

    return () => {
      socket.disconnect();
      console.log('WebSocket disconnected');
    };
  }, []);

  const handleSubmit = async (postData:SensorData) => {

    try {
      await axios.post(url, postData);
      console.log("Sensor data submitted successfully");
      return true
    } catch (error: any) {
      console.error(
        "Error submitting sensor data:",
        error.message,
        error.stack
      );
    }
  };

  return (
    <>
      <SensorDataForm onSubmit={handleSubmit} />
      <SensorDataTable sensorData={sensorData} />
    </>
  );
};

export default SensorDataDashboard;
