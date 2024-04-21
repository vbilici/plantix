import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    credentials: true
  }
}) 
export class SensorsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  afterInit(server): void {
    console.log('Sensor gateway initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  broadcastData(data: any) {
    try {
      // Ensure data is in array format before broadcasting
      if (!Array.isArray(data)) {
        console.warn('Data to broadcast is not an array. Wrapping in array.');
        data = [data];
      }
      this.server.emit('sensorData', data);
      console.log(`Broadcasting data: ${JSON.stringify(data)}`);
    } catch (error:any) {
      console.error(`Error broadcasting sensor data: ${error.message}`, error.stack);
    }
  }

}