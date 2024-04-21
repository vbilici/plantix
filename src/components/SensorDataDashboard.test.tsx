import { render, screen, cleanup } from "@testing-library/react";
import axios from "axios";
import SensorDataDashboard from "./SensorDataDashboard";

const mockData = [
  {
    sensorId: "1",
    type: "temperature",
    value: "25",
    timestamp: "2023-01-01T00:00:00Z",
  },
];

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: mockData });

describe("Sensor Data Table", () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
    cleanup();
  });

  test("renders the dashboard correctly", async () => {
    const mockDate = new Date(1466424490000)
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate)

    const { container } = render(<SensorDataDashboard />);

    const sensorTypeElement = await screen.findByText("temperature");
    expect(sensorTypeElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
