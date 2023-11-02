import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { PlatilloModule } from './modules/platillo/platillo.module';
import { ConfigurationService } from './configuration/services/configuration.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { APP_GUARD } from '@nestjs/core';
import { HealthController } from './health.controller';
import { PersonalidadModule } from './modules/personalidad/personalidad.module';

@Module({
  imports: [
    PlatilloModule,
    PersonalidadModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigurationService],
    }),
    /**
     * https://docs.nestjs.com/security/rate-limiting#configuration
     * ttl: the number of seconds that each request will last in storage
     * limit: the maximum number of requests within the TTL limit
     * ignoreUserAgents: an array of regular expressions of user-agents to ignore when it comes to throttling requests
     * storage: the storage setting for how to keep track of the requests
     */
    ThrottlerModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: () => ({
        ignoreUserAgents: [],
        throttlers: [
          {
            ttl: 60,
            limit: 100,
          },
        ],
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [HealthController],
})
export class AppModule {}
