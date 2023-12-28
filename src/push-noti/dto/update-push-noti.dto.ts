import { PartialType } from '@nestjs/swagger';
import { CreatePushNotiDto } from './create-push-noti.dto';

export class UpdatePushNotiDto extends PartialType(CreatePushNotiDto) {}
