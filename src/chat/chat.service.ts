import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { handleError } from '../services/error';
import { UserChat } from '../user-chat/entities/userchat.entity';
import { FindMyChatsDto } from './dto/findMy-chats.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject("CHATS_REPOSITORY") private chatsRepository: typeof Chat,
    @Inject("USERS_REPOSITORY") private usersRepository: typeof User,
    @Inject("USERCHATS_REPOSITORY") private userchatsRepository: typeof UserChat,
  ){}


  async create(createChatDto: CreateChatDto) {
    try {
      const { clientId, userId } = createChatDto;
      const chat = await this.chatsRepository.create({userId: [userId, clientId]})

      const userChat = await this.userchatsRepository.create({ chatId: chat.id, userId})
      const clientChat = await this.userchatsRepository.create({ chatId: chat.id, userId: clientId })

      // return {chat, userChat, clientChat}
      return {userChat}
    } catch(error) {
      handleError(error)
    }
  }

  async findMyChats(findMyChatsDto: FindMyChatsDto) {
    try {
      const { userId } = findMyChatsDto;
      const allChats = await this.userchatsRepository.findAll({ where: { userId }, include: [
        // {
        //   model: this.chatsRepository,
        //   as: "chat"
        // },
      ]});

      const allUserInAllChats = allChats.map(async (item) => {
        const chat = await this.userchatsRepository.findAll({ where: { chatId: item.chatId }, include: [
            {
              model: this.usersRepository,
              as: "user"
            },
        ]})
        return chat
      })

      let result = await Promise.all(allUserInAllChats)
      result = result.map(item => item.filter(el => el.userId !== userId))


      return {allChats, result}
    } catch(error) {
      handleError(error)
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