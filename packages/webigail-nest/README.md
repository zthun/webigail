# Webigail Nest

NestJs already comes with an http module built in, so it is recommended to just use that one. If you are using
webigail-http and you want to inject that service into your nest project, then this package comes with the module that
will do that for you.

## Build Status

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/zthun/webigail/tree/latest.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/zthun/webigail/tree/latest)

## Usage

Webigail is built in TypeScript and it exports both ESM and CJS modules.

```sh
# NPM
npm install @zthun/webigail-nest
# Yarn
yarn add @zthun/webigail-nest
```

```ts
// product-module.ts
import { ZHttpModule } from '@zthun/webigail-nest';

@Module(
  imports: [ZHttpModule],
  providers: [ProductService],
  exports: [ProductService]
)
export class ProductModule {}

// product-service.ts
import { IZHttpService } from '@zthun/webigail-http';

@Injectable()
export class ProductService {
  public constructor(@Inject(ZHttpServiceToken) private _http: IZHttpService) {}
}
```
