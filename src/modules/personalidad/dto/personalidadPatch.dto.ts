import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class personalidadPatchDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nacionalidad?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  nacimiento?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  foto?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  video?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  id_platillo?: Types.ObjectId;
}
