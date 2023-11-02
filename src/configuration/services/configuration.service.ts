import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigurationService {
  private readonly envConfig: { [key: string]: string };

  constructor(fileName?: string) {
    const filePath = fileName || '.env';
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key] || process.env[key];
  }
}
