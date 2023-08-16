# Webigail Http

There's many libraries for invoking http requests such as axios, node-fetch, and the built in fetch api. These work, but
don't make it easy to do dependency injection.

The webigail-http package uses an interface + class based approach to http requests which makes dependency injection
much easier.

## Build Status

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/zthun/webigail/tree/latest.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/zthun/webigail/tree/latest)

## Usage

Webigail is built in TypeScript and it exports both ESM and CJS modules.

```sh
# NPM
npm install @zthun/webigail-http
# Yarn
yarn add @zthun/webigail-http
```

```ts
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { Product } from '../models/product';

export class ProductService {
  public constructor(private _http: IZHttpService) {}

  public static endpoint(): string {
    const url = new ZUrlBuilder().api(location).path('users').build();
    return url;
  }

  public list(): Promise<Product> {
    const request = new ZHttpRequestBuilder().url(ProductService.endpoint()).get().build();
    const { data } = this._http.request<Product>(request);
    return data;
  }

  public create(product: Product): Promise<Product> {
    const request = new ZHttpRequestBuilder().url(ProductService.endpoint()).post(product).build();
    const { data } = this._http.request<Product>(request);
    return data;
  }
}

// Somewhere at the root of your application.
import { ZHttpService } from '@zthun/webigail-http';

const product = new ProductService(new ZHttpService());
```

## Testing

One challenge with dealing with http services and functions in tests is mocking API calls. You can override functions
like get, post, but if you want to respond to different URL invocations, then it can become a bit of a pain to do so.
Instead of having to create a mock and shuffle the http service implementations, this package also includes a mock
implementation of the http service.

```ts
import { createGuid } from '@zthun/helpful-fn';
import { ZHttpServiceMock } from '@zthun/webigail-http';

describe('ProductService', () => {
  let http: ZHttpServiceMock;

  const createTestTarget = () => new ProductService(http);

  beforeEach(() => {
    http = new ZHttpServiceMock();

    http.set(
      ProductService.endpoint(),
      ZHttpMethod.Get,
      new ZHttpResultBuilder<User>().data([createMockExistingUser(), createMockExistingUser()]).build()
    );

    http.set(ProductService.endpoint(), ZHttpMethod.Post, (r) =>
      new ZHttpResultBuilder<User>().data(Object.assign({}, r.body!, { id: createGuid() })).build()
    );
  });

  it('should retrieve the list of users', async () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    const actual = await target.list();
    // Assert.
    expect(actual.length).toEqual(2);
  });
});
```
