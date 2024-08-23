import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
import { Chat } from "../../chat/entities/chat.entity";
import { DataTypes } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";

@Table
export class UserChat extends Model<UserChat> {

  @ApiProperty()
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  })
  id: string

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID
  })
  userId: string;

  @ApiProperty()
  @ForeignKey(() => Chat)
  @Column({
    type: DataTypes.UUID
  })
  chatId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    as: 'user',
  })
  service: User

  @BelongsTo(() => Chat, {
    foreignKey: 'chatId',
    as: 'chat',
  })
  chat: Chat;
}