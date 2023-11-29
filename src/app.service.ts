import { Injectable } from '@nestjs/common';
import { AppServiceTypes } from './types/app.service.types';
import { returnService } from './mock/mock.service';

@Injectable()
export class AppService {
  getHello(): AppServiceTypes {
    return returnService;
  }
}
