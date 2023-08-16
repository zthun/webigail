import { Module } from '@nestjs/common';
import { ZHttpService } from '@zthun/webigail-http';
import { ZHttpServiceToken } from './http-service-token';

const ZHttpServiceProvider = { provide: ZHttpServiceToken, useValue: new ZHttpService() };

@Module({
  providers: [ZHttpServiceProvider, ZHttpService],
  exports: [ZHttpServiceProvider, ZHttpService]
})
/**
 * Represents a module that provides http services.
 */
export class ZHttpModule {}
