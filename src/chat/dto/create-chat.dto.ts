import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: any;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  clientsId: string;
}
