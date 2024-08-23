import { Inject, Injectable } from '@nestjs/common';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { handleError } from '../services/error';
import { AuthOkResponse } from '../types/auth';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject() private jwtService: JwtService
  ) {}


  async signIn(signInAuthDto: SignInAuthDto): Promise<AuthOkResponse> {
    try {
      const { id, name, phone, publicKey, avatar, role } = await this.userService.findOne(signInAuthDto);

      const access_token = await this.jwtService.signAsync({
        id,
        name,
        phone,
        publicKey,
        avatar,
        role
      })

      return {access_token}
    } catch(error) {
      handleError(error)
    }
  }

  async signUp(signUpAuthDto: SignUpAuthDto): Promise<AuthOkResponse> {
    try {
      const { id, name, phone, publicKey, avatar, role } = await this.userService.create(signUpAuthDto)

      const access_token = await this.jwtService.signAsync({
        id,
        name,
        phone,
        publicKey,
        avatar,
        role
      })

      return {access_token}
    } catch(error) {
      handleError(error)
    }
  }
}
