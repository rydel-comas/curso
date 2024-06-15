import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ProductEnum } from '../enum/product.enum';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(ProductEnum)
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly providerId: string;
}
