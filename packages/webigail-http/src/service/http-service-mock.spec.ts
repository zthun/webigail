import { beforeEach, describe, expect, it } from 'vitest';
import { IZHttpRequest, ZHttpMethod, ZHttpRequestBuilder } from '../request/http-request.mjs';
import { ZHttpCodeClient } from '../result/http-code-client.mjs';
import { ZHttpCodeInformationalResponse } from '../result/http-code-informational-response.mjs';
import { ZHttpCodeServer } from '../result/http-code-server.mjs';
import { ZHttpCodeSuccess } from '../result/http-code-success.mjs';
import { ZHttpCode } from '../result/http-code.mjs';
import { IZHttpResult, ZHttpResultBuilder } from '../result/http-result.mjs';
import { ZHttpServiceMock } from './http-service-mock.mjs';

describe('ZHttpServiceMock', () => {
  function createTestTarget() {
    return new ZHttpServiceMock();
  }

  describe('Resolving and Rejecting by Status', () => {
    let endpoint: string;
    let data: any;

    beforeEach(() => {
      endpoint = 'https://zthunworks.com/api/objects';
      data = { value: 100 };
    });

    async function assertCompletes(
      requestFn: (t: ZHttpServiceMock, r: IZHttpRequest) => Promise<IZHttpResult>,
      code: ZHttpCode
    ) {
      // Arrange
      const target = createTestTarget();
      const expected = new ZHttpResultBuilder(data).status(code).build();
      target.set(endpoint, ZHttpMethod.Get, expected);
      const req = new ZHttpRequestBuilder().get().url(endpoint).build();
      // Act
      const actual = await requestFn(target, req);
      // Assert
      expect(actual).toEqual(expected);
    }

    const assertResolvesRequest: (code: ZHttpCode) => Promise<void> = assertCompletes.bind(
      null,
      (t: ZHttpServiceMock, r: IZHttpRequest) => t.request(r)
    );
    const assertRejectsRequest: (code: ZHttpCode) => Promise<void> = assertCompletes.bind(
      null,
      (t: ZHttpServiceMock, r: IZHttpRequest) => t.request(r).catch((e) => Promise.resolve(e))
    );

    it('should return a resolved promise for code 100.', async () => {
      await assertResolvesRequest(ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('should return a resolved promise for code 200.', async () => {
      await assertResolvesRequest(ZHttpCodeSuccess.Accepted);
    });

    it('should return a rejected promise for code 400.', async () => {
      await assertRejectsRequest(ZHttpCodeClient.BadRequest);
    });

    it('should return a rejected promise for code 500.', async () => {
      await assertRejectsRequest(ZHttpCodeServer.InsufficientStorage);
    });
  });

  describe('Data Retrieval', () => {
    let strings: string[];
    let stringsEndpoint: string;
    let numbers: number[];
    let numbersEndpoint: string;

    function list<T>(arr: T[]) {
      return new ZHttpResultBuilder(arr).status(ZHttpCodeSuccess.OK).build();
    }

    function create<T>(arr: T[], req: IZHttpRequest) {
      arr.push(req.body.data);
      return new ZHttpResultBuilder(req.body.data).status(ZHttpCodeSuccess.Created).build();
    }

    function update<T>(arr: T[], req: IZHttpRequest) {
      arr[req.body.index] = req.body.data;
      return new ZHttpResultBuilder(req.body.data).status(ZHttpCodeSuccess.OK).build();
    }

    function createPopulatedTarget() {
      const target = createTestTarget();
      target.set(stringsEndpoint, ZHttpMethod.Get, () => list(strings));
      target.set(stringsEndpoint, ZHttpMethod.Put, (req: IZHttpRequest) => update(strings, req));
      target.set(stringsEndpoint, ZHttpMethod.Post, (req: IZHttpRequest) => create(strings, req));
      target.set(numbersEndpoint, ZHttpMethod.Get, () => list(numbers));
      return target;
    }

    beforeEach(() => {
      strings = ['a', 'b', 'c', 'd', 'e'];
      numbers = [1, 2, 3, 4, 5, 6, 7];
      stringsEndpoint = 'https://zthunworks.com/api/objects';
      numbersEndpoint = 'https://zthunworks.com/api/numbers';
    });

    it('should return a resolved promise for successful data retrievals.', async () => {
      // Arrange
      const target = createPopulatedTarget();
      const req = new ZHttpRequestBuilder().url(stringsEndpoint).get().build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(strings);
    });

    it('should return a resolved promise routing with the correct verb.', async () => {
      // Arrange
      const target = createPopulatedTarget();
      const req = new ZHttpRequestBuilder().url(stringsEndpoint).post({ data: 8 }).build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(8);
    });

    it('should return a rejected promise for missing endpoints.', async () => {
      // Arrange
      const target = createPopulatedTarget();
      const req = new ZHttpRequestBuilder().url(numbersEndpoint).put({ data: 8, index: 2 }).build();
      // Act
      const actual: any = await target
        .request(req)
        .then(() => Promise.reject('failed'))
        .catch((e) => Promise.resolve(e));
      // Assert
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
    });
  });
});
