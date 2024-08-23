import { ApiProperty } from "@nestjs/swagger";

export class AuthOkResponse {
  @ApiProperty()
  access_token: string
}