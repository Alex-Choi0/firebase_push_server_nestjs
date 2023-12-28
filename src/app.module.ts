import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PushNotiModule } from './push-noti/push-noti.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      // env파일 스키마 점검
      validationSchema: Joi.object({
        NESTJS_STATUS: Joi.string().required(), // 서버의 구동 상태에 대해서 표시
      }),
    }),
    PushNotiModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
