import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    @Post()
create(@Body() body) {
  return this.productService.create(body);
}

@Get()
findAll() {
  return this.productService.findAll();
}
}
