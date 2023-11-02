import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { IPersonalidad } from '../interfaces/personalidad.interface';
import { IPersonalidadPatch } from '../interfaces/personalidadPatch.interface';
import { PersonalidadRepository } from '../repository/personalidad.repository';

@Injectable()
export class PersonalidadService {
  private readonly logger = new Logger('PersonalidadService');

  constructor(private personalidadRepository: PersonalidadRepository) {}

  async create(platillo: IPersonalidad) {
    try {
      return await this.personalidadRepository.create(platillo);
    } catch (e) {
      this.handleError(e);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.personalidadRepository.findAll(limit, page);
    } catch (e) {
      this.handleError(e);
    }
  }

  async find(id: Types.ObjectId) {
    try {
      return await this.personalidadRepository.find(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  async patch(id: Types.ObjectId, platillo: IPersonalidadPatch) {
    try {
      return await this.personalidadRepository.patch(id, platillo);
    } catch (e) {
      this.handleError(e);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      return await this.personalidadRepository.delete(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}
