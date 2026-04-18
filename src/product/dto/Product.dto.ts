import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product',
        example: 'Laptop',
    })
    @IsString()
  name: string;

    @ApiProperty({
        description: 'Price of the product',
        example: 999.99,
    })
    @IsNumber()
  price: number;
}