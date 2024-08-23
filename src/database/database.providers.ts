import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { Chat } from '../chat/entities/chat.entity';
import { UserChat } from '../user-chat/entities/userchat.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5437,
        username: 'admin',
        password: '123456',
        database: 'chat',
      });
      sequelize.addModels([User, Chat, UserChat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];