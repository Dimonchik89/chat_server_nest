import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [UserModule, AuthModule, ChatModule, DatabaseModule, FileModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", 'static'),
  }),],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule]
})
export class AppModule {}
