import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseProviders } from "./database.providers";
import { UserChat } from "../user-chat/entities/userchat.entity";
import { Chat } from "../chat/entities/chat.entity";
import { User } from "../user/entities/user.entity";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}