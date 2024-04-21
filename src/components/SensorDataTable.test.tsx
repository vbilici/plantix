
import { render, screen } from '@testing-library/react';
import SensorDataTable from "./SensorDataTable";

const mockData = [
  { sensorId: '1', type: 'temperature', value: 25, timestamp: '2023-01-01T00:00:00Z' },
];

describe("Sensor Data Table", () => {

  it('renders sensor data table correctly', async () => {
    const {container} = render(<SensorDataTable sensorData={mockData} />); 

    const sensorTypeElement = await screen.findByText('temperature');
    expect(sensorTypeElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});