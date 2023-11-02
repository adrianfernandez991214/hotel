import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class personalidadDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  nacionalidad: string;

  @IsDateString()
  @IsNotEmpty()
  nacimiento: Date;

  @IsNotEmpty()
  @IsMongoId()
  id_platillo: Types.ObjectId;
}
