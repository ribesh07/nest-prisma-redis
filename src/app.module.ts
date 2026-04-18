import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    PrismaModule,
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    }),
  ],
  controllers: [AppController],
providers: [AppService],
})
export class AppModule {}