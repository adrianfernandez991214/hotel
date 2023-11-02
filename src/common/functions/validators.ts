import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const isObjectId = (terminalId: string): Types.ObjectId => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(terminalId)) {
    throw new BadRequestException('Id must be a mongodb id');
  }
  return Types.ObjectId.createFromHexString(terminalId);
};
