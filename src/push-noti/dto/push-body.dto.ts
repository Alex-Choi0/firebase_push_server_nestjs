import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsEnum,
  IsInt,
  IsJSON,
  IsOptional,
  IsString,
} from 'class-validator';

export class PushBody {
  @IsEmpty()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '양식이 존재하는 푸시로 보낼시 DB의 event타입을 입력',
    type: String,
    name: 'eventId',
    required: false,
    example: 'use_item',
  })
  eventId: string;

  // 푸쉬를 받을 유저 firebase토큰
  @IsString({ each: true })
  @ApiProperty({
    description: '유저 Id를 배열로 넣는다.',
    example: ['56be9770-f807-49ca-81c3-81a9806cc38a'],
  })
  user_id: string[];

  @IsString()
  @ApiProperty({
    description: '푸쉬메세지 타이틀',
    example: '상금을 잡자(Test Message)',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: '메세지 바디값(string으로 입력)',
    example: '게임시간이 10분 남았습니다.(Test Message)',
  })
  body: string;

  @IsEmpty()
  create_at?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '푸시를 보낼 예약시간(ISO규격으로 보내야함)',
    example: '2022-08-12T05:56:19.433Z',
  })
  reservation_at: Date;

  @IsEmpty()
  send_at?: Date;

  @IsEmpty()
  read_at?: Date;

  @IsEmpty()
  push_status?: string;

  @IsEnum(['moveBottom', 'openWebLink', 'rout'])
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '푸시 타입',
    example: 'openWebLink',
  })
  type?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    required: false,
    description: 'type이 moveBottom일시 누를 버튼 인덱스',
    example: 1,
  })
  bottomIndex?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'type이 openWebLink일시 접속할 해당 링크 주소',
    example: 'https://namu.wiki/w/PORTAL%202',
  })
  webLinkUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'type이 rout일시 사용',
    example: 'apple',
  })
  routeName?: string;

  @IsBoolean()
  @ApiProperty({
    required: true,
    name: 'give_item',
    type: Boolean,
    description:
      '해당 푸시메세지는 아이템을 제공시 true, 기본은 false. true가 될시 Parameta에서 giveItems키값을 읽게 된다.',
    example: false,
  })
  give_item: boolean;

  @IsOptional()
  @IsJSON()
  @ApiProperty({
    required: false,
    description:
      'JSON형식의 String 파라메타값 입력. give_item이 true일시 {giveItems : [아이템 uuid] : [int]}으로 작성한다.',
    example: '{"when":"now","who":"all"}',
  })
  parameter?: string;

  @IsBoolean()
  @ApiProperty({
    required: true,
    description: '바로 보낼 푸시 메세지는 true로 설정',
    example: false,
  })
  sendNow: boolean;
}
