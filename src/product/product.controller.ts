import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/Product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private productService: ProductService) {}

  @ApiOperation({
    summary: "Create Product",
    description: "This is to Create a product"
  })
    @Post()
create(@Body() body: CreateProductDto) {
  return this.productService.create(body);
}

@Get()
findAll() {
  return this.productService.findAll();
}
}
