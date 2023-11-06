import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class platilloPatchDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  ingredientes: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  foto?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  video?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  audio?: string;
}
