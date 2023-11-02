import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PersonalidadDocument = HydratedDocument<Personalidad>;

@Schema({ timestamps: true })
export class Personalidad {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  nacionalidad: string;

  @Prop({ type: Date, required: true })
  nacimiento: Date;

  @Prop({ type: String })
  foto: string;

  @Prop({ type: String })
  video: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Platillo' })
  id_platillo: Types.ObjectId;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const PersonalidadSchema = SchemaFactory.createForClass(Personalidad);

PersonalidadSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, ...rest } = result;
    return { id: _id, ...rest };
  },
});
