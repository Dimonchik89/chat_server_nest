import { ApiProperty } from "@nestjs/swagger";

export class FindMyChatsDto {
  @ApiProperty()
  userId: string
}