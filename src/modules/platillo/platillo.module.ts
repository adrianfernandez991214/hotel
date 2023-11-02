import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatilloController } from './controllers/platillo.controller';
import { Platillo, PlatilloSchema } from 'src/schema';
import { PlatilloService } from './services/platillo.service';
import { PlatilloRepository } from './repository/platillo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Platillo.name, schema: PlatilloSchema },
    ]),
  ],
  controllers: [PatilloController],
  providers: [PlatilloService, PlatilloRepository],
  exports: [],
})
export class PlatilloModule {}
