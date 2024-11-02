import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';
//import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ManipulateProductInterceptor } from './interceptors/manipulate-product.interceptor';
import { ManipulateResponseInterceptor } from './interceptors/manipulate-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.useGlobalInterceptors(new ManipulateProductInterceptor(),new ManipulateResponseInterceptor());


  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation API NVP Internship First Nest JS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, ProductsModule, PaymentsModule],
  });
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API swagger running on http://localhost:${process.env.PORT ?? 3000}/api-docs`);
}

bootstrap();
