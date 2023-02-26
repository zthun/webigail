import { describe, expect, it } from 'vitest';
import { ZHttpMethod, ZHttpRequestBuilder } from './http-request';

describe('ZHttpRequestBuilder', () => {
  function createTestTarget() {
    return new ZHttpRequestBuilder();
  }

  describe('Properties', () => {
    describe('General', () => {
      it('should set the url.', () => {
        const expected = 'https://google.com';
        expect(createTestTarget().url(expected).build().url).toEqual(expected);
      });

      it('should set the timeout.', () => {
        const expected = 5000;
        expect(createTestTarget().timeout(expected).build().timeout).toEqual(expected);
      });
    });

    describe('Method', () => {
      it('should send a GET request.', () => {
        expect(createTestTarget().get().build().method).toEqual(ZHttpMethod.Get);
      });

      it('should send a POST request.', () => {
        expect(createTestTarget().post().build().method).toEqual(ZHttpMethod.Post);
      });

      it('should send a POST request with a body.', () => {
        const expected = { value: 0 };
        expect(createTestTarget().post(expected).build().body).toEqual(expected);
      });

      it('should send a PUT request.', () => {
        expect(createTestTarget().put().build().method).toEqual(ZHttpMethod.Put);
      });

      it('should send a PUT request with a body.', () => {
        const expected = { value: 0 };
        expect(createTestTarget().put(expected).build().body).toEqual(expected);
      });

      it('should send a DELETE request.', () => {
        expect(createTestTarget().delete().build().method).toEqual(ZHttpMethod.Delete);
      });

      it('should send a PATCH request.', () => {
        expect(createTestTarget().patch().build().method).toEqual(ZHttpMethod.Patch);
      });

      it('should send a PATCH request with a body.', () => {
        const expected = { value: 0 };
        expect(createTestTarget().patch(expected).build().body).toEqual(expected);
      });

      it('should send a OPTIONS request.', () => {
        expect(createTestTarget().options().build().method).toEqual(ZHttpMethod.Options);
      });

      it('should send a HEAD request.', () => {
        expect(createTestTarget().head().build().method).toEqual(ZHttpMethod.Head);
      });
    });

    describe('Headers', () => {
      it('should add all headers.', () => {
        const expected = {
          'Keep-Alive': 'true',
          'Connection': 'close'
        };
        expect(createTestTarget().headers(expected).build().headers).toEqual(expected);
      });

      it('should add individual headers.', () => {
        const expected = {
          keep: 'true',
          connection: 'close',
          time: '5000'
        };
        const actual = createTestTarget()
          .header('keep', true)
          .header('connection', 'close')
          .header('time', 5000)
          .build().headers;
        expect(actual).toEqual(expected);
      });

      it('should add delete headers.', () => {
        const expected = {
          keep: 'true'
        };
        const actual = createTestTarget()
          .header('keep', true)
          .header('connection', 'close')
          .header('connection', null)
          .build().headers;
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Copy', () => {
    it('should copy another request.', () => {
      const expected = new ZHttpRequestBuilder()
        .post({ value: 10 })
        .url('http://google.com')
        .timeout(5000)
        .header('keep-alive', true)
        .build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
