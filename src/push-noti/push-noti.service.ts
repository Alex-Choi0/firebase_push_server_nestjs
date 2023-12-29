import { HttpException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SendOnePushNotiDto } from './dto/send-one-push-noti.dto';
import { PushNotiErrorCode } from './error/push-noti.error';

@Injectable()
export class PushNotiService {
  constructor(
    @Inject(PushNotiErrorCode)
    private readonly pushNotiErrorCode: PushNotiErrorCode,

    @Inject(FirebaseService)
    private readonly firebaseService: FirebaseService,
  ) {}
  // 테스트 비즈니스로직
  async sendIndividual(dto: SendOnePushNotiDto) {
    try {
      console.log('Start post request : ', dto);
      console.log('firebase : ', process.env.FIREBASE);

      const data = await axios
        .post(
          'https://fcm.googleapis.com/fcm/send',
          // 'POST https://fcm.googleapis.com/v1/projects/playinrpg/messages:send',
          {
            to: dto.to, //// use for single device
            notification: {
              title: dto.title,
              body: dto.body,
              badge: 1,
            },
            notification_priority: 'PRIORITY_MIN',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'key=' + process.env.FIREBASE,
              // Authorization:
              //   'Bearer ' + 'AIzaSyCSVehLYv-EBrzNA56A4RMbiRq_BXtGc8g',
            },
          },
        )
        .then(async (res: any) => {
          return res.data;
        })
        .catch((err) => {
          console.log('Error Result : ', err);
          throw new Error(err.message);
        })
        .finally(() => console.log('axios finish'));
      console.log('result : ', data);
      return data;
    } catch (err) {
      const { statusCode, message } = this.pushNotiErrorCode.getErrorCode(
        err['message'],
      );
      throw new HttpException(message, statusCode);
    }
  }

  // 테스트 비즈니스로직
  async sendIndividual_HTTP_v1(dto: SendOnePushNotiDto) {
    try {
      console.log('Start post request : ', dto);
      console.log('firebase : ', process.env.FIREBASE_PROJECTID);
      console.log('firebase key id : ', process.env.FIREBASE_KEYID);

      const data = await axios
        .post(
          `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECTID}/messages:send`,
          {
            message: {
              token: dto.to,
              notification: {
                title: dto.title,
                body: dto.body,
              },
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: 'Bearer ' + process.env.FIREBASE_KEYID,
              Authorization:
                'Bearer ' + (await this.firebaseService.getAccessToken()),
            },
          },
        )
        .then(async (res: any) => {
          return res.data;
        })
        .catch((err) => {
          console.log('Error Result : ', err);
          throw new Error(err.message);
        })
        .finally(() => console.log('axios finish'));
      console.log('result : ', data);
      return data;
    } catch (err) {
      const { statusCode, message } = this.pushNotiErrorCode.getErrorCode(
        err['message'],
      );
      throw new HttpException(message, statusCode);
    }
  }
}
