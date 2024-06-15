import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ProviderEnum } from '../enum/provider.enum';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(ProviderEnum)
  @IsNotEmpty()
  readonly type: string;
}
