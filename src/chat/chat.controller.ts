import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Patch, Param, Get, Delete, UseGuards} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { AddUsersToChatDto } from './dto/add-users-to-chat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateChatDto } from './dto/update-chat.dto';
import { DeleteUserFromChatDto } from './dto/delete-user-from-shat.dto';
import { DeleteChatType, DeleteUserFromChatType, FindMyChatType } from '../types/chat';
import { DefaultException } from '../types/exception';
import { Chat } from './entities/chat.entity';
import { CheckChatOwner } from './chat.guard';
import { OptionalFilePipe } from '../helper/optional-file-pipe';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;



@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/create")
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ type: Chat })
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
  @ApiResponse({ type: FindMyChatType })
  findMyChats(@Param("userId") userId: string ) {
    return this.chatService.findMyChats(userId)
  }


  @Patch("/add_to_chat/:chatId")
  @UseGuards(CheckChatOwner)
  @ApiBody({ type: AddUsersToChatDto })
  @ApiResponse({ type: DefaultException })
  addUsersToChat(@Body() addUserToChatDto: AddUsersToChatDto, @Param("chatId") chatId: string) {
    return this.chatService.addUsersToChat(addUserToChatDto, chatId)
  }


  @Patch("/update_chat/:chatId")
  @UseGuards(CheckChatOwner)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  updateChat(
    @Body() updateChatDto: UpdateChatDto,
    @Param("chatId") chatId: string,
    @UploadedFile(OptionalFilePipe) avatar?: Express.Multer.File ) {
    return this.chatService.updateChat(updateChatDto, chatId, avatar);
  }


  @Patch("/delete_from_chat/:chatId")
  @UseGuards(CheckChatOwner)
  @ApiBody({ type: DeleteUserFromChatDto })
  @ApiResponse({ type: DeleteUserFromChatType })
  deleteUserFromChat(
    @Body() deleteUserFromChatDto: DeleteUserFromChatDto,
    @Param("chatId") chatId: string) {
    return this.chatService.deleteUsersFromChat(deleteUserFromChatDto, chatId)
  }


  @Delete("/delete_chat/:chatId")
  @UseGuards(CheckChatOwner)
  @ApiResponse({ type: DeleteChatType })
  deleteChat(@Param("chatId") chatId: string): Promise<DeleteChatType> {
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




