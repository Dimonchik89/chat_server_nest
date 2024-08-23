import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../types/user';


export class SignUpAuthDto {
  @ApiProperty({ default: "Petya" })
  name: string;

  @ApiProperty({ default: "0509379992" })
  phone: string;

  @ApiProperty({ default: "qwerty" })
  password: string;

  @ApiProperty({ enum: UserRole, default: "user", required: false })
  role?: UserRole;
}

