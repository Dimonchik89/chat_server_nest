import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { handleError } from '../services/error';
import { UserChat } from '../user-chat/entities/userchat.entity';
import { FindMyChatsDto } from './dto/findMy-chats.dto';
import { User } from '../user/entities/user.entity';
import { AddUsersToChatDto } from './dto/add-users-to-chat.dto';
import { FileService } from '../file/file.service';
import { DeleteUserFromChatDto } from './dto/delete-user-from-shat.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject("CHATS_REPOSITORY") private chatsRepository: typeof Chat,
    @Inject("USERS_REPOSITORY") private usersRepository: typeof User,
    @Inject("USERCHATS_REPOSITORY") private userChatsRepository: typeof UserChat,
    private readonly fileService: FileService
  ){}


  async create(createChatDto: CreateChatDto, avatar: Express.Multer.File) {
    try {
      const { clientsId, userId, name } = createChatDto;
      const avatarPath = await this.fileService.saveFile(avatar);

      const chat = await this.chatsRepository.create({name: name || `Chat_${userId}`, avatar: avatarPath, owner: userId })

      const userChat = await this.userChatsRepository.create({ chatId: chat.id, userId: userId })


      JSON.parse(clientsId).forEach(async (item) => {
        await this.userChatsRepository.create({ chatId: chat.id, userId: item})
      })

      return {chat}
    } catch(error) {
      return handleError(error)
    }
  }

  async findMyChats(userId: string) {
    try {
      const alluserChats = await this.userChatsRepository.findAll({ where: { userId }});

      const allUserInAllUserChats = alluserChats.map(async (item) => {
        const chat = await this.userChatsRepository.findAll({ where: { chatId: item.chatId }, include: [
            {
              model: this.usersRepository,
              as: "user"
            },
            {
              model: this.chatsRepository,
              as: "chat"
            }
        ]})
        return chat
      })

      let result = await Promise.all(allUserInAllUserChats)
      result = result.map(item => item.filter(el => el.userId !== userId))

      return {result}
    } catch(error) {
      return handleError(error)
    }
  }

  async addUsersToChat(addUserToChatDto: AddUsersToChatDto, chatId: string) {
    try {
      const { usersId } = addUserToChatDto;

      usersId.forEach(async (item) => {
        await this.userChatsRepository.create({ chatId, userId: item })
      })

      return new HttpException("success", HttpStatus.OK);
    } catch(error) {
      return handleError(error)
    }
  }

  async updateChat(
    updateChatDto: UpdateChatDto,
    chatId: string,
    avatar: Express.Multer.File): Promise<Chat> {
    try {
      const { name, ...tailDto } = updateChatDto;

      const chat = await this.chatsRepository.findOne({ where: { id: chatId }})

      if(avatar) {
        this.fileService.removeFile(chat.avatar)
        const avatarPath = await this.fileService.saveFile(avatar);

        await this.chatsRepository.update({
          name: name || chat.name,
          avatar: avatarPath
        }, {
          where: {
            id: chatId
          }
        })
      } else {
        await this.chatsRepository.update({
          name: name || chat.name
        }, {
          where: {
            id: chatId
          }
        })
      }


      const newChat = await this.chatsRepository.findOne({ where: { id: chatId }})

      return newChat
    } catch(error) {
      return handleError(error)
    }
  }

  async deleteUsersFromChat(deleteUserFromChatDto: DeleteUserFromChatDto, chatId: string) {
    const { usersId } = deleteUserFromChatDto;
    try {
      usersId.forEach(async (userId) => {
        await this.userChatsRepository.destroy({ where: {
          userId,
          chatId
        }})
      })

      return { message: `Success, users ${usersId.join(", ")} deleted`}
    } catch(error) {
      return handleError(error)
    }
  }

  async deleteChat(chatId: string) {
    try {
      const chat = await this.chatsRepository.findOne<Chat>({ where: { id: chatId }});

      await this.fileService.removeFile(chat.avatar);
      await this.chatsRepository.destroy({ where: { id: chatId }})
      return { message: "chat deleted" }
    } catch(error) {
      return handleError(error)
    }
  }

  // findAll() {
  //   return `This action returns all chat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}


// // Получаем все чаты для пользователя

// const userWithChats = await User.findByPk(userId, {
//   include: [{ model: UserChat, as: 'userChats', include: [Chat] }],
// });



// Получаем всех пользователей для чата

// const chatWithUsers = await Chat.findByPk(chatId, {
//   include: [{ model: UserChat, as: 'userChats', include: [User] }],
// });