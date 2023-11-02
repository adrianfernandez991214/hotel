import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Platillo, PlatilloSchema } from 'src/schema';
import {
  Personalidad,
  PersonalidadSchema,
} from 'src/schema/personalidad.schema';
import { PersonalidadController } from './controllers/personalidad.controller';
import { PersonalidadService } from './services/personalidad.services';
import { PersonalidadRepository } from './repository/personalidad.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Platillo.name, schema: PlatilloSchema },
    ]),
    MongooseModule.forFeature([
      { name: Personalidad.name, schema: PersonalidadSchema },
    ]),
  ],
  controllers: [PersonalidadController],
  providers: [PersonalidadService, PersonalidadRepository],
  exports: [],
})
export class PersonalidadModule {}
