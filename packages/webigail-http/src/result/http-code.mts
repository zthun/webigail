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

/**
 * Represents a category of http code.
 */
export type ZHttpCode =
  | ZHttpCodeInformationalResponse
  | ZHttpCodeSuccess
  | ZHttpCodeRedirection
  | ZHttpCodeClient
  | ZHttpCodeServer;

/**
 * Represents the category name for an http code.
 */
export enum ZHttpCodeCategory {
  /**
   * Error codes 100-199.
   */
  InformationalResponse = 'Informational Response',
  /**
   * Error codes 200-299.
   */
  Success = 'Success',
  /**
   * Error codes 300-399.
   */
  Redirection = 'Redirection',
  /**
   * Error codes 400-499.
   */
  Client = 'Client Error',
  /**
   * Error codes 500-599.
   */
  Server = 'Server Error'
}

/**
 * Represents a classification of severity for a code.
 */
export enum ZHttpCodeSeverity {
  /**
   * Covers information response (100-199) and redirection codes (300-399).
   */
  Info = 'info',
  /**
   * Covers the success codes (200-299)
   */
  Success = 'success',
  /**
   * Covers client errors (400-499).
   */
  Warning = 'warning',
  /**
   * Covers server errors (500-599).
   */
  Error = 'error'
}

/**
 * Gets the english friendly name of a code.
 *
 * @param code -
 *        The code to retrieve the name for.
 *
 * @returns
 *        The english friendly name of a code.
 */
export function getHttpCodeName(code: ZHttpCode): string {
  return (
    ZHttpCodeInformationalResponseNames[code] ||
    ZHttpCodeSuccessNames[code] ||
    ZHttpCodeRedirectionNames[code] ||
    ZHttpCodeClientNames[code] ||
    ZHttpCodeServerNames[code]
  );
}

/**
 * Gets the english friendly description of a code.
 *
 * @param code -
 *        The code to retrieve the description for.
 *
 * @returns
 *        The english friendly description of a code.
 */
export function getHttpCodeDescription(code: ZHttpCode) {
  return (
    ZHttpCodeInformationalResponseDescriptions[code] ||
    ZHttpCodeSuccessDescriptions[code] ||
    ZHttpCodeRedirectionDescriptions[code] ||
    ZHttpCodeClientDescriptions[code] ||
    ZHttpCodeServerDescriptions[code]
  );
}

/**
 * Gets the severity of a code.
 *
 * @param code -
 *        The severity of a code.
 *
 * @returns
 *        The severity of a code.
 */
export function getHttpCodeSeverity(code: ZHttpCode): ZHttpCodeSeverity {
  if (code >= 200 && code < 300) {
    return ZHttpCodeSeverity.Success;
  }

  if (code >= 400 && code < 500) {
    return ZHttpCodeSeverity.Warning;
  }

  if (code >= 500) {
    return ZHttpCodeSeverity.Error;
  }

  return ZHttpCodeSeverity.Info;
}

/**
 * Gets the category of a code.
 *
 * @param code -
 *        The category of a code.
 *
 * @returns
 *        The code category.
 */
export function getHttpCodeCategory(code: ZHttpCode): ZHttpCodeCategory {
  if (code >= 100 && code < 200) {
    return ZHttpCodeCategory.InformationalResponse;
  }

  if (code >= 200 && code < 300) {
    return ZHttpCodeCategory.Success;
  }

  if (code >= 300 && code < 400) {
    return ZHttpCodeCategory.Redirection;
  }

  if (code >= 400 && code < 500) {
    return ZHttpCodeCategory.Client;
  }

  return ZHttpCodeCategory.Server;
}
