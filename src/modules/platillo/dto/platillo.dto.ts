import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class platilloDTO {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
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
