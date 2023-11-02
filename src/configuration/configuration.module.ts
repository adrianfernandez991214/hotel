import { Module } from '@nestjs/common';

import { ConfigurationService } from './services/configuration.service';

@Module({
  providers: [
    {
      provide: ConfigurationService,
      useValue: new ConfigurationService(),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
