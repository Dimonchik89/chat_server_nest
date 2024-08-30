import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../auth/constants";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class CheckChatOwner implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject("CHATS_REPOSITORY") private chatsRepository: typeof Chat,
  ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { chatId } = request.params;
      const token = this.extractTokenFromHeader(request);

      if(!chatId) {
        throw new BadRequestException("chatId is not found")
      }


      if(!token) {
        throw new UnauthorizedException()
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })

        const { id: useId } = payload;
        const chat = await this.chatsRepository.findOne({ where: { id: chatId }})


        if(chat.owner !== useId) {
          throw new ForbiddenException()
        }

        return true
      } catch(error) {
        throw new UnauthorizedException(error)
      }

    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(" ") ?? []
      return type === "Bearer" ? token : undefined
    }
}