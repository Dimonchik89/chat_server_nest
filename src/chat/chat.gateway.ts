import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

import { Server, Socket } from 'socket.io';
import { Post } from '@nestjs/common';

@WebSocketGateway({ namespace: "/gateway", cors: true })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @Post()
  create(@MessageBody() createChatDto: CreateChatDto) {
    // return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    // return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    // return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    // return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    // return this.chatService.remove(id);
  }

  afterInit(server: Server) {
    console.log('WebSocket сервер инициализирован');
  }

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage("joinRoom")
  joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): void {
    console.log("roomId", 111111111111111111111, roomId);

    client.join(roomId)
  }

  @SubscribeMessage("sendMessage")
  handleMessage(@MessageBody() messageData: { roomId: string, message: string }): void
 {
  const { message, roomId } = messageData

  console.log("message", message, roomId);


  this.server.to(roomId).emit("receiveMessage", {message, roomId})

 }
  // @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: any): void {
  //   this.server.emit('message', payload);
  // }
}
