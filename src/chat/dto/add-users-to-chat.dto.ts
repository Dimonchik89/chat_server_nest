import { ApiProperty } from "@nestjs/swagger";

export class AddUsersToChatDto {

  @ApiProperty()
  usersId: Array<string>
}