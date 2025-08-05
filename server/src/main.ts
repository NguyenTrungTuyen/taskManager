import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
     whitelist: true, // Loại bỏ các thuộc tính không có trong DTO.
     forbidNonWhitelisted: true, //Ném lỗi nếu có thuộc tính không mong muốn.
   }));

   const config = new DocumentBuilder()
  .setTitle('TASK MANAGER API')            // Tiêu đề
  .setDescription('API TASK MANAGER') // Mô tả
  .setVersion('1.0')                   // Version
  .addBearerAuth()   
  .build();

   const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // Đường dẫn: /swagger

  await app.listen(process.env.PORT ?? 3003);
  console.log(`Server is running on: http://localhost:${process.env.PORT ?? 3003}`);
  // swagger
  console.log(`Swagger is running on: http://localhost:${process.env.PORT ?? 3003}/swagger`);
}
bootstrap();
