import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { chatsProviders } from './chat.providers';
import { ChatController } from './chat.controller';
import { userchatsProviders } from '../user-chat/userchat.providers';
import { usersProviders } from '../user/user.providers';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, ...chatsProviders, ...userchatsProviders, ...usersProviders],
})
export class ChatModule {}
