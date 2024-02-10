// @vitest-environment jsdom

import { HttpResponse, http } from 'msw';
import { SetupServer, setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { ZHttpRequestBuilder } from '../request/http-request.mjs';
import { ZHttpCodeClient } from '../result/http-code-client.mjs';
import { ZHttpCodeRedirection } from '../result/http-code-redirection.mjs';
import { ZHttpCodeSuccess } from '../result/http-code-success.mjs';
import { ZHttpService } from './http-service.mjs';

describe('ZHttpService', () => {
  const Domain = 'https://mock.zthunworks.com';
  const SuccessJson = { message: 'Success' };
  const FailureJson = { message: 'This is Fine!' };
  let _server: SetupServer;

  function createTestTarget() {
    return new ZHttpService();
  }

  beforeAll(async () => {
    _server = setupServer(
      http.get(`${Domain}/api/success/json`, () => HttpResponse.json(SuccessJson, { status: ZHttpCodeSuccess.OK })),
      http.post(`${Domain}/api/success/json`, async (r) =>
        HttpResponse.json(await r.request.json(), { status: ZHttpCodeSuccess.Created })
      ),
      http.patch(`${Domain}/api/success/json`, async (r) =>
        HttpResponse.json(await r.request.json(), { status: ZHttpCodeSuccess.OK })
      ),
      http.put(`${Domain}/api/success/json`, async (r) =>
        HttpResponse.json(await r.request.json(), { status: ZHttpCodeSuccess.OK })
      ),
      http.delete(
        `${Domain}/api/success/json`,
        async () => new HttpResponse(null, { status: ZHttpCodeSuccess.NoContent })
      ),
      http.get(`${Domain}/api/failure/client`, () =>
        HttpResponse.json(FailureJson, { status: ZHttpCodeClient.NotFound })
      ),
      http.get(`${Domain}/api/redirect/temporary`, () =>
        HttpResponse.redirect(`${Domain}/api/success/json`, ZHttpCodeRedirection.TemporaryRedirect)
      ),
      http.get(`${Domain}/api/failure/internal`, () => {
        throw new Error(FailureJson.message);
      })
    );
    _server.listen();
  });

  afterEach(() => {
    _server.resetHandlers();
  });

  afterAll(() => {
    _server.close();
  });

  describe('Success', () => {
    const url = `${Domain}/api/success/json`;

    it('should return a resolved result from a GET request.', async () => {
      // Arrange
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().get().url(url).build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.status).toEqual(200);
      expect(actual.data).toEqual(SuccessJson);
    });

    it('should return a resolved result from a POST request.', async () => {
      // Arrange.
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().post(SuccessJson).url(url).build();
      // Act.
      const actual = await target.request(req);
      // Assert.
      expect(actual.status).toEqual(201);
      expect(actual.data).toEqual(SuccessJson);
    });

    it('should return a resolved result from a PATCH request.', async () => {
      // Arrange.
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().patch(SuccessJson).url(url).build();
      // Act.
      const actual = await target.request(req);
      // Assert.
      expect(actual.status).toEqual(200);
      expect(actual.data).toEqual(SuccessJson);
    });

    it('should return a resolved result from a PUT request.', async () => {
      // Arrange.
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().put(SuccessJson).url(url).build();
      // Act.
      const actual = await target.request(req);
      // Assert.
      expect(actual.status).toEqual(200);
      expect(actual.data).toEqual(SuccessJson);
    });

    it('should return a resolved result from a DELETE request.', async () => {
      // Arrange.
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().delete().url(url).build();
      // Act.
      const actual = await target.request(req);
      // Assert.
      expect(actual.status).toEqual(204);
    });
  });

  describe('Error', () => {
    it('should return a rejected promise on client failure.', async () => {
      // Arrange
      const req = new ZHttpRequestBuilder().get().url(`${Domain}/api/failure/client`).build();
      const target = createTestTarget();
      // Act
      const actual = await target
        .request(req)
        .then(() => null)
        .catch((err) => err);
      // Assert
      expect(actual.status).toEqual(404);
      expect(actual.data).toEqual(FailureJson);
    });

    it('should return a rejected promise if the request was made but the endpoint cannot be hit.', async () => {
      // Arrange
      const req = new ZHttpRequestBuilder().get().url('https://not-an-endpoint.org').build();
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err);
      // Assert
      expect(actual.status).toBeGreaterThanOrEqual(404);
      expect(actual.data).toBeDefined();
    });

    it('should return a rejected promise if the request is not a valid url.', async () => {
      // Arrange
      const req = new ZHttpRequestBuilder().get().url('lol-wut').build();
      const target = createTestTarget();
      // Act
      const actual = await target
        .request(req)
        .then(() => null)
        .catch((err) => err);
      // Assert
      expect(actual.status).toBeGreaterThanOrEqual(404);
      expect(actual.data).toBeDefined();
    });

    it('should return a rejected promise if an internal exception occurs', async () => {
      // Arrange
      const req = new ZHttpRequestBuilder().get().url(`${Domain}/api/failure/internal`).build();
      const target = createTestTarget();
      // Act
      const actual = await target
        .request(req)
        .then(() => null)
        .catch((err) => err);
      // Assert
      expect(actual.status).toBeGreaterThanOrEqual(500);
      expect(actual.data).toContain(FailureJson.message);
    });
  });

  describe('Redirect', () => {
    it('should follow a redirect to the new URL.', async () => {
      // Arrange.
      const req = new ZHttpRequestBuilder().get().url(`${Domain}/api/redirect/temporary`).build();
      const target = createTestTarget();
      // Act.
      const actual = await target.request(req);
      // Assert.
      expect(actual.status).toEqual(200);
      expect(actual.data).toEqual(SuccessJson);
    });
  });
});
