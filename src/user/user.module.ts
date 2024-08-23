import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from "./user.providers";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Chat } from '../chat/entities/chat.entity';
import { UserChat } from '../user-chat/entities/userchat.entity';


@Module({
  // imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService]
})
export class UserModule {}
