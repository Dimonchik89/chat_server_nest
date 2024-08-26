import { ApiProperty } from "@nestjs/swagger";

export class AddUsersToChatDto {
  @ApiProperty()
  chatId: string;

  @ApiProperty()
  usersId: Array<string>
}