import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   // set a user and password
  //   ['/api-docs', '/api-docs-json'],
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       admin: 'kncurationPasswrd', // [user name] : [password : string]
  //     },
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Document를 설정
  const options = new DocumentBuilder()
    .setTitle(`Firebase Push Server(HTTP v1) : ${process.env.NESTJS_STATUS}`)
    .setVersion('1.0')
    .addBearerAuth()
    .setDescription(
      `
      사양
      - node : v20.10.0
      - nestjs : 10.2.1

      내용
      - 현재 서버API는 테스트버전 입니다.
      - firebase를 이용하여 서버에서 요청을 받으면 푸시를 보냅니다.
    `,
    )
    .setContact('Alex-Choi', 'https://github.com/Alex-Choi0', '')
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
