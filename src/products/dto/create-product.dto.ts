import { IsString, IsNotEmpty, Matches } from 'class-validator';
export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly providerId: string;
}
