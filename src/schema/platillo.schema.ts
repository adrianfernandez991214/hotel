import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlatilloDocument = HydratedDocument<Platillo>;

@Schema({ timestamps: true })
export class Platillo {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  ingredientes: string;

  @Prop({ type: String })
  foto: string;

  @Prop({ type: String })
  video: string;

  @Prop({ type: String })
  audio: string;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const PlatilloSchema = SchemaFactory.createForClass(Platillo);

PlatilloSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, ...rest } = result;
    return { id: _id, ...rest };
  },
});
