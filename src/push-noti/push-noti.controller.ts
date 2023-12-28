import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendOnePushNotiDto } from './dto/send-one-push-noti.dto';
import { PushNotiService } from './push-noti.service';

@ApiTags('firebase 푸시 보내기 API')
@Controller('push-noti')
export class PushNotiController {
  constructor(private readonly pushNotiService: PushNotiService) {}

  @Post('send/single')
  @ApiOperation({
    summary: '하나의 디바이스에 푸시를 보낸다.',
    description:
      '하나의 디바이스에 푸시메세지를 보냅니다. 해당 디바이스의 토큰이 필요합니다.',
  })
  async sendOneDevicePush(@Body() dto: SendOnePushNotiDto) {
    return await this.pushNotiService.sendIndividual(dto);
  }

  @Post('send/single/HTTPV1')
  @ApiOperation({
    summary: '하나의 디바이스에 푸시를 보낸다.(HTTPV1 버전)',
    description:
      '하나의 디바이스에 푸시메세지를 보냅니다. 해당 디바이스의 토큰이 필요합니다.',
  })
  async sendOneDevicePushHTTPV1(@Body() dto: SendOnePushNotiDto) {
    return await this.pushNotiService.sendIndividual_HTTP_v1(dto);
  }
}
