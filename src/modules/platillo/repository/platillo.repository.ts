import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Platillo } from 'src/schema';
import { IPlatillo } from '../interfaces/platillo.interface';
import { IPlatilloPatch } from '../interfaces/platilloPatch.interface';
import { platilloMessages } from 'src/mappings/platillo-messages.mappings';

export class PlatilloRepository {
  private readonly logger = new Logger('PlatilloRepository');

  constructor(
    @InjectModel(Platillo.name) public platilloModel: Model<Platillo>,
  ) {}

  async create(platillo: IPlatillo): Promise<IPlatillo> {
    try {
      return (await this.platilloModel.create(platillo)).toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.platilloModel
        .find({ deletedAt: null })
        .skip(Number(page))
        .limit(Number(limit));
    } catch (error) {
      this.handleError(error);
    }
  }

  async find(id: Types.ObjectId): Promise<IPlatillo> {
    try {
      const term = await this.findTerminal(id);

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(
    id: Types.ObjectId,
    platillo: IPlatilloPatch,
  ): Promise<IPlatillo> {
    try {
      return await this.updateTerminal(id, platillo);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      const term = await this.findTerminal(id);
      // We update the deletedAt field with the current date and time
      term.deletedAt = new Date();
      await term.save();

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async findTerminal(id: Types.ObjectId) {
    const term = await this.platilloModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!term) {
      throw new BadRequestException(platilloMessages.platilloNotExist);
    }
    return term;
  }

  private async updateTerminal(id: Types.ObjectId, terminal: IPlatilloPatch) {
    const terminalUpdated = await this.platilloModel.findByIdAndUpdate(
      id,
      terminal,
      { new: true },
    );

    return terminalUpdated.toJSON();
  }

  private handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}
