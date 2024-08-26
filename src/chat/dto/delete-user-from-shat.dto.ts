import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserFromChatDto {
  @ApiProperty()
  usersId: Array<string>
}