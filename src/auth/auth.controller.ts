import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthOkResponse } from '../types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @ApiBody({ type: SignInAuthDto })
  @ApiResponse({
    status: 201,
    type: AuthOkResponse,
  })
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post("signup")
  @ApiBody({ type: SignUpAuthDto })
  @ApiResponse({
    status: 201,
    type: AuthOkResponse,
  })
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUp(signUpAuthDto);
  }
}
