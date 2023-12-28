import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PushNotiErrorCode {
  getErrorCode(message: string = 'Server Error'): {
    statusCode: number;
    message: string;
  } {
    console.log('incomming error message : ', message);
    if (message === '문의한 유저와 요청한 유저가 일치하지 않습니다.') {
      return {
        statusCode: HttpStatus.CONFLICT,
        message,
      };
    } else if (
      message === 'Email 또는 Password가 틀렸습니다.' ||
      message === '기존 비밀번호가 일치하지 않습니다.' ||
      message === '존재하지 않습니다.'
    ) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      };
    } else if (message === '존재하지 않는 문의사항 id입니다.') {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    };
  }
}
