import { Module } from '@nestjs/common';
import { ZHttpService } from '@zthun/webigail-http';
import { ZHttpServiceToken } from './http-service-token';

const ZHttpServiceProvider = { provide: ZHttpServiceToken, useValue: new ZHttpService() };

/**
 * A module that provides http services.
 */
@Module({
  providers: [ZHttpServiceProvider, ZHttpService],
  exports: [ZHttpServiceProvider, ZHttpService]
})
export class ZHttpModule {}
