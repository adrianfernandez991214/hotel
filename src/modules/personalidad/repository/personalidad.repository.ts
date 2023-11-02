import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Personalidad } from 'src/schema/personalidad.schema';
import { IPersonalidad } from '../interfaces/personalidad.interface';
import { IPersonalidadPatch } from '../interfaces/personalidadPatch.interface';
import { personalidadMessages } from 'src/mappings/personalidad-menssages.mappings';
import { Platillo } from 'src/schema/platillo.schema';
import { platilloMessages } from 'src/mappings/platillo-messages.mappings';

export class PersonalidadRepository {
  private readonly logger = new Logger('PersonalidadRepository');

  constructor(
    @InjectModel(Personalidad.name)
    public personalidadModel: Model<Personalidad>,
    @InjectModel(Platillo.name)
    public platilloModel: Model<Platillo>,
  ) {}

  async create(personalidad: IPersonalidad): Promise<IPersonalidad> {
    try {
      await this.findPlatillo(personalidad.id_platillo);
      return (await this.personalidadModel.create(personalidad)).toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.personalidadModel
        .find({ deletedAt: null })
        .skip(Number(page))
        .limit(Number(limit));
    } catch (error) {
      this.handleError(error);
    }
  }

  async find(id: Types.ObjectId): Promise<IPersonalidad> {
    try {
      const term = await this.findPersonalidad(id);

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(
    id: Types.ObjectId,
    personalidad: IPersonalidadPatch,
  ): Promise<IPersonalidad> {
    try {
      if (personalidad.id_platillo) {
        await this.findPlatillo(personalidad.id_platillo);
      }
      return await this.updatePersonalidad(id, personalidad);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      const term = await this.findPersonalidad(id);
      // We update the deletedAt field with the current date and time
      term.deletedAt = new Date();
      await term.save();

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async findPersonalidad(id: Types.ObjectId) {
    const personalidad = await this.personalidadModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!personalidad) {
      throw new BadRequestException(personalidadMessages.personalidadNotExist);
    }
    return personalidad;
  }

  private async updatePersonalidad(
    id: Types.ObjectId,
    terminal: IPersonalidadPatch,
  ) {
    const personalidadUpdated = await this.personalidadModel.findByIdAndUpdate(
      id,
      terminal,
      { new: true },
    );

    return personalidadUpdated.toJSON();
  }

  private async findPlatillo(id: Types.ObjectId) {
    const platillo = await this.platilloModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!platillo) {
      throw new BadRequestException(platilloMessages.platilloNotExist);
    }
    return platillo;
  }

  private handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}
