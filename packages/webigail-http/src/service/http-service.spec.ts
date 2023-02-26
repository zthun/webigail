import axios, { AxiosError, AxiosHeaders } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IZHttpRequest, ZHttpRequestBuilder } from '../request/http-request';
import { ZHttpService } from './http-service';

vi.mock('axios');

describe('ZHttpService', () => {
  function createTestTarget() {
    return new ZHttpService();
  }

  describe('Success', () => {
    it('should return a resolved result from the request.', async () => {
      // Arrange
      const expected = 'Success';
      vi.mocked(axios).mockResolvedValue({
        status: 200,
        statusText: 'Success',
        data: expected,
        config: {},
        headers: {}
      });
      const target = createTestTarget();
      const req = new ZHttpRequestBuilder().get().url('https://www.zthunworks.com/api/health').build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(expected);
    });
  });

  describe('Error', () => {
    let error: AxiosError;
    let data: string;
    let message: string;
    let req: IZHttpRequest;

    beforeEach(() => {
      req = new ZHttpRequestBuilder().delete().url('https://www.zthunworks.com/api/').build();

      data = 'Error data';
      message = 'Failed';

      error = {
        name: 'Error',
        response: {
          data,
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {
            headers: new AxiosHeaders()
          }
        },
        request: {},
        message,
        isAxiosError: true,
        toJSON: vi.fn()
      };
    });

    it('should return a rejected promise on failure.', async () => {
      // Arrange
      vi.mocked(axios).mockRejectedValue(error);
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toEqual(data);
    });

    it('should return a rejected promise if the request was made but the endpoint cannot be hit.', async () => {
      // Arrange
      delete error.response;
      vi.mocked(axios).mockRejectedValue(error);
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toContain('endpoint could not be reached');
    });

    it('should return a rejected promise if the request cannot be made at all.', async () => {
      // Arrange
      delete error.request;
      delete error.response;
      vi.mocked(axios).mockRejectedValue(error);
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toEqual(message);
    });

    it('should return a rejected promise with a generic message if something else goes wrong.', async () => {
      vi.mocked(axios).mockRejectedValue({});
      const target = createTestTarget();
      // Act
      const actual = await target.request(req).catch((err) => err.data);
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
