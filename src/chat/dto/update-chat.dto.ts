import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @ApiProperty()
  name?: string;
}
