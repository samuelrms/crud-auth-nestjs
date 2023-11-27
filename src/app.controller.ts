import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppServiceTypes } from './types/app.service.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): AppServiceTypes {
    return this.appService.getHello();
  }
}
