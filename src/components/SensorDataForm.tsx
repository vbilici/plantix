import { Button, TextInput, Select, Card, SelectItem, NumberInput } from "@tremor/react";
import { FC, useState, FormEvent } from "react";
import { SensorData } from "./SensorDataDashboard";

interface SensorDataFormProps {
  onSubmit: (event: SensorData) => void;
}

const SensorDataForm: FC<SensorDataFormProps> = ({onSubmit}) => {
  const [sensorId, setSensorId] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState(0);
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  const handleSensorIdChange = (value:string) => {
    setSensorId(value);
  };

  const handleTypeChange = (value:string) => {
    setType(value);
  };

  const handleValueChange = (value:number) => {
    setValue(value);
  };

  const handleTimestampChange = (value:string) => {
    setTimestamp(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const postData =     {
      sensorId,
      type,
      value,
      timestamp,
    }

    onSubmit(postData);

    setSensorId("");
    setType("");
    setValue(0);
    setTimestamp(new Date().toISOString());
  }



  const isSubmitEnabled = sensorId && type && value && timestamp;

  return (
    <Card className="p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          placeholder="Sensor ID"
          value={sensorId}
          onValueChange={handleSensorIdChange}
        />
        <Select placeholder="Type" value={type} onValueChange={handleTypeChange}>
          <SelectItem value="">Select Type</SelectItem>
          <SelectItem value="temperature">Temperature</SelectItem>
          <SelectItem value="humidity">Humidity</SelectItem>
          <SelectItem value="windSpeed">Wind Speed</SelectItem>
          <SelectItem value="windDirection">Wind Direction</SelectItem>
          <SelectItem value="pH">pH</SelectItem>
        </Select>

        <NumberInput
          placeholder="Value"
          value={value}
          onValueChange={handleValueChange}
        />
        <TextInput
          type="text"
          placeholder="Timestamp"
          value={timestamp}
          onValueChange={handleTimestampChange}
        />
        <Button type="submit" disabled={!isSubmitEnabled}>Submit</Button>
      </form>
    </Card>
  );
};

export default SensorDataForm;
