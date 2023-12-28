import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PushNotiErrorCode } from './error/push-noti.error';
import { PushNotiController } from './push-noti.controller';
import { PushNotiService } from './push-noti.service';

@Module({
  imports: [FirebaseModule],
  controllers: [PushNotiController],
  providers: [PushNotiService, PushNotiErrorCode],
})
export class PushNotiModule {}
