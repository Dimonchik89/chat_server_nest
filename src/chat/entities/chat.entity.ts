import { DataTypes } from "sequelize";
import { Table, Column, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
import { UserChat } from "../../user-chat/entities/userchat.entity";

@Table
export class Chat extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  })
  id: string

  @Column
  name: string;

  @Column
  avatar: string;

  @Column
  owner: string;

  @HasMany(() => UserChat, {
    foreignKey: 'chatId',
    as: 'userChat',
  })
  users: UserChat[]
}
