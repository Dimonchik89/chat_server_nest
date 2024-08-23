import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthDto {
  @ApiProperty({ default: "0509379992" })
  phone: string;

  @ApiProperty({ default: "qwerty" })
  password: string;
}
