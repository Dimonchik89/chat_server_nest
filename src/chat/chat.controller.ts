import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindMyChatsDto } from './dto/findMy-chats.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserChat } from '../user-chat/entities/userchat.entity';
import { AddUsersToChatDto } from './dto/add-users-to-chat.dto';
import { FileInterceptor } from '@nestjs/platform-express';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/create")
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ type: UserChat })
  create(
    @Body() createChatDto: CreateChatDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'image/jpeg' })
      .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) avatar: Express.Multer.File) {
    return this.chatService.create(createChatDto, avatar);
  }

  @Post("/find_all_chats")
  @ApiBody({ type: FindMyChatsDto })
  @ApiResponse({ type: [UserChat] }) // переделать на правельные фходящие данные, создать class для них
  findMyChats(@Body() findMyChatsDto: FindMyChatsDto ) {
    return this.chatService.findMyChats(findMyChatsDto)
  }

  @Post("/add_to_chat")
  addUsersToChat(@Body() addUserToChatDto: AddUsersToChatDto) {
    return this.chatService.addUsersToChat(addUserToChatDto)
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
