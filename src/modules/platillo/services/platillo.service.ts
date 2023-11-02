import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { IPlatillo } from '../interfaces/platillo.interface';
import { IPlatilloPatch } from '../interfaces/platilloPatch.interface';
import { PlatilloRepository } from '../repository/platillo.repository';

@Injectable()
export class PlatilloService {
  private readonly logger = new Logger('PlatilloService');

  constructor(private platilloRepository: PlatilloRepository) {}

  async create(platillo: IPlatillo) {
    try {
      return await this.platilloRepository.create(platillo);
    } catch (e) {
      this.handleError(e);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.platilloRepository.findAll(limit, page);
    } catch (e) {
      this.handleError(e);
    }
  }

  async find(id: Types.ObjectId) {
    try {
      return await this.platilloRepository.find(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  async patch(id: Types.ObjectId, platillo: IPlatilloPatch) {
    try {
      return await this.platilloRepository.patch(id, platillo);
    } catch (e) {
      this.handleError(e);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      return await this.platilloRepository.delete(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}
