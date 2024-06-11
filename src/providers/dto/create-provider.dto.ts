import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateProviderDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

}
