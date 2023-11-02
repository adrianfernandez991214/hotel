import { Types } from 'mongoose';

export interface IPersonalidad {
  nombre: string;
  descripcion: string;
  nacionalidad: string;
  nacimiento: Date;
  foto?: string;
  video?: string;
  id_platillo: Types.ObjectId;
}
