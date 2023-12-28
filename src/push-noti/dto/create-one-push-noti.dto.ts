import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PushBody } from './push-body.dto';

export class CreateOnePushNotiDto {
  @IsString()
  @ApiProperty({
    required: true,
    description: '해당 디바이스의 firebase token',
    example:
      'eZdEB5pCS-KZ7wkp0gsO6N:APA91bELP81WFVnpG1AjpGmlJu8fBr1LodktM2vdZwNtG2ToCf5d1I8t7BMPav1bxLjwwAv9GqeMbBrrAISUHoM9hDkmG-vFLn5hlQ3BuiN1zEkq3fgx51lYEMBAfJz77cGHXCufuDz4',
  })
  to: string;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'notification 타이틀(제목)',
    example: 'takeThePrize',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'notification 내용',
  })
  body: PushBody;
}
