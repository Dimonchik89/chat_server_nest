import { DataTypes } from "sequelize"
import { Table, Column, Model, DataType, BelongsToMany, HasMany } from "sequelize-typescript"
import { Chat } from "../../chat/entities/chat.entity"
import { UserChat } from "../../user-chat/entities/userchat.entity"
import { ApiProperty } from "@nestjs/swagger"

@Table
export class User extends Model {

  @ApiProperty()
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  })
  id: string

  @ApiProperty()
  @Column({
    allowNull: false,
    defaultValue: `user_${Date.now()}`
  })
  name: string

  @ApiProperty()
  @Column({
    allowNull: false
  })
  phone: string

  @ApiProperty()
  @Column
  role: "user" | "admin"

  @ApiProperty()
  @Column({
    allowNull: false
  })
  hashPassword: string

  @ApiProperty()
  @Column({
    allowNull: true
  })
  avatar: string

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  publicKey: string

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  privateKey: string

  // @BelongsToMany(() => Chat, () => UserChat)
  // chats: Chat[]
  @HasMany(() => UserChat,
  {
    foreignKey: 'userId',
    as: 'userChat',
  })
  chats: UserChat[]
}

