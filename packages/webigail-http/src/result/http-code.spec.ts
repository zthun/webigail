import { describe, expect, it } from 'vitest';
import { ZHttpCodeClient, ZHttpCodeClientDescriptions, ZHttpCodeClientNames } from './http-code-client.mjs';
import {
  ZHttpCodeInformationalResponse,
  ZHttpCodeInformationalResponseDescriptions,
  ZHttpCodeInformationalResponseNames
} from './http-code-informational-response.mjs';
import {
  ZHttpCodeRedirection,
  ZHttpCodeRedirectionDescriptions,
  ZHttpCodeRedirectionNames
} from './http-code-redirection.mjs';
import { ZHttpCodeServer, ZHttpCodeServerDescriptions, ZHttpCodeServerNames } from './http-code-server.mjs';
import { ZHttpCodeSuccess, ZHttpCodeSuccessDescriptions, ZHttpCodeSuccessNames } from './http-code-success.mjs';
import {
  ZHttpCode,
  ZHttpCodeCategory,
  ZHttpCodeSeverity,
  getHttpCodeCategory,
  getHttpCodeDescription,
  getHttpCodeName,
  getHttpCodeSeverity
} from './http-code.mjs';

describe('ZHttpCode', () => {
  function assertValueFromDictionary(
    fn: (code: ZHttpCode) => string,
    dictionary: { [key: number]: string },
    code: ZHttpCode
  ) {
    // Arrange
    const expected = dictionary[code];
    // Act
    const actual = fn(code);
    // Assert
    expect(actual).toEqual(expected);
  }

  function assertValueTranslatesFromCode<TValue>(fn: (code: ZHttpCode) => TValue, expected: TValue, code: ZHttpCode) {
    // Arrange
    // Act
    const actual = fn(code);
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Name', () => {
    const assertName = assertValueFromDictionary.bind(null, getHttpCodeName);

    it('returns for an informational code.', () => {
      assertName(ZHttpCodeInformationalResponseNames, ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('returns for a success code.', () => {
      assertName(ZHttpCodeSuccessNames, ZHttpCodeSuccess.MultiStatus);
    });

    it('returns for a redirect code.', () => {
      assertName(ZHttpCodeRedirectionNames, ZHttpCodeRedirection.PermanentRedirect);
    });

    it('returns for a client error code.', () => {
      assertName(ZHttpCodeClientNames, ZHttpCodeClient.ImATeapot);
    });

    it('returns for a server error code.', () => {
      assertName(ZHttpCodeServerNames, ZHttpCodeServer.HttpVersionNotSupported);
    });
  });

  describe('Description', () => {
    const assertDescription = assertValueFromDictionary.bind(null, getHttpCodeDescription);

    it('returns for an informational code.', () => {
      assertDescription(ZHttpCodeInformationalResponseDescriptions, ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('returns for a success code.', () => {
      assertDescription(ZHttpCodeSuccessDescriptions, ZHttpCodeSuccess.MultiStatus);
    });

    it('returns for a redirect code.', () => {
      assertDescription(ZHttpCodeRedirectionDescriptions, ZHttpCodeRedirection.PermanentRedirect);
    });

    it('returns for a client error code.', () => {
      assertDescription(ZHttpCodeClientDescriptions, ZHttpCodeClient.ImATeapot);
    });

    it('returns for a server error code.', () => {
      assertDescription(ZHttpCodeServerDescriptions, ZHttpCodeServer.HttpVersionNotSupported);
    });
  });

  describe('Severity', () => {
    const assertSeverity = assertValueTranslatesFromCode.bind(null, getHttpCodeSeverity);

    it('should return info for informational response codes.', () => {
      assertSeverity(ZHttpCodeSeverity.Info, ZHttpCodeInformationalResponse.Continue);
    });

    it('should return info for redirects.', () => {
      assertSeverity(ZHttpCodeSeverity.Info, ZHttpCodeRedirection.MultipleChoices);
    });

    it('should return success for success codes.', () => {
      assertSeverity(ZHttpCodeSeverity.Success, ZHttpCodeSuccess.OK);
    });

    it('should return warnings for client errors.', () => {
      assertSeverity(ZHttpCodeSeverity.Warning, ZHttpCodeClient.BadRequest);
    });

    it('should return error for server error.', () => {
      assertSeverity(ZHttpCodeSeverity.Error, ZHttpCodeServer.InternalServerError);
    });
  });

  describe('Category', () => {
    const assertCategory = assertValueTranslatesFromCode.bind(null, getHttpCodeCategory);

    it('should return info for informational response.', () => {
      assertCategory(ZHttpCodeCategory.InformationalResponse, ZHttpCodeInformationalResponse.Continue);
    });

    it('should return redirects for redirects.', () => {
      assertCategory(ZHttpCodeCategory.Redirection, ZHttpCodeRedirection.MultipleChoices);
    });

    it('should return success for success.', () => {
      assertCategory(ZHttpCodeCategory.Success, ZHttpCodeSuccess.OK);
    });

    it('should return client for client.', () => {
      assertCategory(ZHttpCodeCategory.Client, ZHttpCodeClient.BadRequest);
    });

    it('should return server for server.', () => {
      assertCategory(ZHttpCodeCategory.Server, ZHttpCodeServer.InternalServerError);
    });
  });
});
