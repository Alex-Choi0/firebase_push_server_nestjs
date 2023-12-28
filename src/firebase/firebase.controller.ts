import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseService } from './firebase.service';

@ApiTags('test api')
@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get()
  @ApiOperation({
    summary: 'google에서 Access token을 받는다',
    description:
      'root 경로에 firebase.json파일이 있어야 한다. 해당 토큰의 유효시간은 1시간 이다.',
  })
  async getAccess() {
    return await this.firebaseService.getAccessToken();
  }
}
