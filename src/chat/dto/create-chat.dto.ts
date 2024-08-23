import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  clientId: string;
}
