import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindMyChatsDto } from './dto/findMy-chats.dto';
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { UserChat } from '../user-chat/entities/userchat.entity';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ type: UserChat })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Post("/find_all_chats")
  @ApiBody({ type: FindMyChatsDto })
  @ApiResponse({ type: [UserChat] }) // переделать на правельные фходящие данные, создать class для них
  findMyChats(@Body() findMyChatsDto: FindMyChatsDto ) {
    return this.chatService.findMyChats(findMyChatsDto)
  }

  // @Get("/lalala")
  // findAll() {
  //   return "lalalala"
  //   // return this.userService.findAll();
  // }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.userService.remove(+id);
  // }
}
