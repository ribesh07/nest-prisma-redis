import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

   async create(data: any) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    const cache = await this.redis.get('products');

    if (cache) {
      console.log('CACHE HIT');
      return JSON.parse(cache);
    }

    console.log('DB HIT');
    const products = await this.prisma.product.findMany();

    await this.redis.set('products', JSON.stringify(products), 'EX', 60);

    return products;
  }
}