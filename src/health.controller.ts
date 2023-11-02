import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class HealthController {
  constructor() {}

  @Get('/')
  healthcheck() {
    return {
      success: true,
      message: 'This is a healthcheck',
    };
  }
}
