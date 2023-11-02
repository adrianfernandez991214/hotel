import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class fileDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  foto?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  video?: string;
}
