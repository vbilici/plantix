import { FC } from 'react';
import { Title, Subtitle } from "@tremor/react";
import Layout from './components/Layout';
import SensorDataDashboard from './components/SensorDataDashboard';

const App: FC = () => {
  return (
    <Layout>
      <Title className='mb-6 px-4'>Plantix Coding Challenge</Title>
      <Subtitle className='mb-6 px-4'>Dashboard</Subtitle>
      <SensorDataDashboard />
    </Layout>
  );
};

export default App;