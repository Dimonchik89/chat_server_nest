import { ApiProperty } from "@nestjs/swagger";
import { UserChat } from "../user-chat/entities/userchat.entity";

export class FindMyChatType {
  @ApiProperty({ type: Array<Array<UserChat>>})
  result: Array<Array<UserChat>>
}

export class DeleteUserFromChatType {
  message: string
}

export class DeleteChatType extends DeleteUserFromChatType{}