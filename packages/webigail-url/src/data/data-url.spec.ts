/* eslint-disable require-jsdoc */
import { ZMimeTypeText } from '../mime/mime-type-text';
import { ZDataUrlBuilder } from './data-url';

describe('ZDataUrlBuilder', () => {
  function createTestTarget() {
    return new ZDataUrlBuilder();
  }

  describe('Properties', () => {
    it('should default to the empty data uri.', () => {
      const expected = 'data:,';
      expect(createTestTarget().build()).toEqual(expected);
    });

    it('should set the raw data.', () => {
      const expected = 'data:text/plain,hello';
      expect(createTestTarget().mimeType(ZMimeTypeText.Plain).buffer(Buffer.from('hello')).build()).toEqual(expected);
    });

    it('should default the mime type to text/plain', () => {
      const expected = 'data:,hello';
      expect(createTestTarget().buffer('hello').build()).toEqual(expected);
    });

    it('should encode the data in base 64.', () => {
      const raw = 'one,two,three';
      const data = Buffer.from(raw).toString('base64');
      const expected = `data:text/css;base64,${data}`;
      expect(createTestTarget().mimeType(ZMimeTypeText.CSS).buffer(raw).encode('base64').build()).toEqual(expected);
    });

    it('should escape necessary characters if the encoding is utf8.', () => {
      const raw = 'Hello, World!';
      const expected = 'data:,Hello%2C%20World%21';
      expect(createTestTarget().buffer(raw).build()).toEqual(expected);
    });
  });

  describe('Parse', () => {
    function assertParsesTo(expected: string, input: string) {
      // Arrange
      // Act
      const actual = createTestTarget().parse(input).build();
      // Assert
      expect(actual).toEqual(expected);
    }

    it('successfully returns the same parsed uri with base64.', () => {
      // cspell:disable-next-line
      const expected = 'data:text/plain;charset=UTF8;base64,SGVsbG8sIFdvcmxkIQ==';
      assertParsesTo(expected, expected);
    });

    it('successfully returns the same parsed uri with base64 but no mime type.', () => {
      // cspell:disable-next-line
      const expected = 'data:;base64,SGVsbG8sIFdvcmxkIQ==';
      assertParsesTo(expected, expected);
    });

    it('successfully returns the same parsed uri without base64.', () => {
      const expected = 'data:,Hello%2C%20World%21';
      assertParsesTo(expected, expected);
    });

    it('successfully returns the same parsed uri with mime type but no base 64.', () => {
      const expected = 'data:text/plain,Hello%2C%20World%21';
      assertParsesTo(expected, expected);
    });

    it('successfully returns the empty data uri.', () => {
      const expected = 'data:,';
      assertParsesTo(expected, expected);
    });

    it('will support commas in the body and correct the encoding.', () => {
      assertParsesTo('data:text/plain,cat%2C%2C%2C', 'data:text/plain,cat,,,');
    });

    it('can modify the url parts.', () => {
      // Arrange
      // cspell:disable
      const current = 'data:,Hello%2C%20World%21';
      const expected = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
      // cspell:enable
      // Act
      const actual = createTestTarget().parse(current).mimeType(ZMimeTypeText.Plain).encode('base64').build();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('returns the empty data uri if the text is not a data uri.', () => {
      assertParsesTo('data:,', 'not-a-valid-data-uri');
    });

    it('returns the empty data uri if the url is incomplete.', () => {
      assertParsesTo('data:,', 'data:');
    });

    it('reverts the mime type to octet-stream if the mime type is not supported.', () => {
      assertParsesTo('data:application/octet-stream,hello', 'data:lol-wut,hello');
    });

    it('auto corrects the mime type without a body if the mime type is incorrectly formatted.', () => {
      assertParsesTo('data:application/octet-stream,', 'data:lol-wut,');
    });

    it('auto corrects the body to the empty string if a base64 encoded string cannot be decoded.', () => {
      assertParsesTo('data:text/plain;base64,', 'data:text/plain;base64,==');
    });
  });

  describe('Info', () => {
    it('should return the raw data of the data buffer.', () => {
      // Arrange
      const expected = 'Hello, World!';
      // cspell:disable-next-line
      const target = createTestTarget().parse('data:text/plain;charset=UTF8;base64,SGVsbG8sIFdvcmxkIQ==');
      // Act
      const info = target.info();
      const actual = info.buffer.toString('utf8');
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
