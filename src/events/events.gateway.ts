import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connected:', client.id);
    client.broadcast.emit('msg', { message: `${client.id} has connected!` });
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    client.broadcast.emit('msg', { message: `${client.id} has disconnected!` });
  }

  @SubscribeMessage('msg')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { message: string }) {
    client.broadcast.emit('msg', data);
  }
}
