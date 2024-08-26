import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Patch, Param, Get, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindMyChatsDto } from './dto/findMy-chats.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserChat } from '../user-chat/entities/userchat.entity';
import { AddUsersToChatDto } from './dto/add-users-to-chat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateChatDto } from './dto/update-chat.dto';
import { DeleteUserFromChatDto } from './dto/delete-user-from-shat.dto';

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

  @Get("/find_all_chats/:userId")
  @ApiBody({ type: FindMyChatsDto })
  @ApiResponse({ type: [UserChat] }) // переделать на правельные фходящие данные, создать class для них
  findMyChats(@Param("userId") userId: string ) {
    return this.chatService.findMyChats(userId)
  }

  @Patch("/add_to_chat/:chatId")
  addUsersToChat(@Body() addUserToChatDto: AddUsersToChatDto, @Param("chatId") chatId: string) {
    return this.chatService.addUsersToChat(addUserToChatDto, chatId)
  }

  @Patch("/update_chat/:chatId")
  @UseInterceptors(FileInterceptor('avatar'))
  updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param("chatId") chatId: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'image/jpeg' })
      .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) avatar: Express.Multer.File ) {
    return this.chatService.updateChat(updateChatDto, chatId, avatar);
  }

  @Patch("/delete_from_chat/:chatId")
  deleteUserFromChat(@Body() deleteUserFromChatDto: DeleteUserFromChatDto, @Param("chatId") chatId: string) {
    return this.chatService.deleteUsersFromChat(deleteUserFromChatDto, chatId)
  }

  @Delete("/delete_chat/:chatId")
  deleteChat(@Param("chatId") chatId: string) {
    return this.chatService.deleteChat(chatId)
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
