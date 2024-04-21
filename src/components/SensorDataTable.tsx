import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

interface SensorData {
  sensorId: string;
  type: string;
  value: number;
  timestamp: string;
}

interface SensorDataTableProps {
  sensorData: SensorData[];
}

const SensorDataTable: FC<SensorDataTableProps> = ({ sensorData }) => {
  if (!Array.isArray(sensorData)) {
    return null;
  }
  return <div className="mx-auto">
    <Table >
      <TableHead>
        <TableRow>
          <TableHeaderCell>Sensor Id</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell className="text-right">Value</TableHeaderCell>
          <TableHeaderCell>Timestamp</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {sensorData.map((data, index) => (
          <TableRow key={`dtr-${index}`}>
            <TableCell>{data.sensorId}</TableCell>
            <TableCell>{data.type}</TableCell>
            <TableCell className="text-right">{data.value}</TableCell>
            <TableCell>{data.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>;
};

export default SensorDataTable;
