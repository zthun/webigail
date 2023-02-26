/**
 * This class of status codes indicates the action requested by
 * the client was received, understood and accepted.
 */
export enum ZHttpCodeSuccess {
  /**
   * Standard response for successful HTTP requests.
   *
   * The actual response will depend on the request method used. In a GET
   * request, the response will contain an entity corresponding to the
   * requested resource. In a POST request, the response will contain an
   * entity describing or containing the result of the action.
   */
  OK = 200,

  /**
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  Created = 201,

  /**
   * The request has been accepted for processing, but the processing has not been completed.
   *
   * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
   */
  Accepted = 202,

  /**
   * The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin,
   * but is returning a modified version of the origin's response.
   */
  NonAuthoritativeInformation = 203,

  /**
   * The server successfully processed the request and is not returning any content.
   */
  NoContent = 204,

  /**
   * The server successfully processed the request, but is not returning any content.
   *
   * Unlike a 204 response, this response requires that the requester reset the document view.
   */
  ResetContent = 205,

  /**
   * The server is delivering only part of the resource (byte serving) due to a range header
   * sent by the client.
   *
   * The range header is used by HTTP clients to enable resuming of interrupted downloads, or
   * split a download into multiple simultaneous streams.
   */
  PartialContent = 206,

  /**
   * The message body that follows is by default an XML message and can contain a number of separate
   * response codes, depending on how many sub-requests were made.
   */
  MultiStatus = 207,

  /**
   * The members of a DAV binding have already been enumerated in a preceding part of the
   * response, and are not being included again.
   */
  AlreadyReported = 208,

  /**
   * The server has fulfilled a request for the resource, and the response is a representation of the result
   * of one or more instance-manipulations applied to the current instance.
   */
  IMUsed = 226
}

/**
 * Friendly english names of success codes.
 */
export const ZHttpCodeSuccessNames: Record<ZHttpCodeSuccess, string> = {
  [ZHttpCodeSuccess.OK]: 'OK',
  [ZHttpCodeSuccess.Created]: 'Created',
  [ZHttpCodeSuccess.Accepted]: 'Accepted',
  [ZHttpCodeSuccess.NonAuthoritativeInformation]: 'Non-Authoritative Information',
  [ZHttpCodeSuccess.NoContent]: 'No Content',
  [ZHttpCodeSuccess.ResetContent]: 'Reset Content',
  [ZHttpCodeSuccess.PartialContent]: 'Partial Content',
  [ZHttpCodeSuccess.MultiStatus]: 'Multi Status',
  [ZHttpCodeSuccess.AlreadyReported]: 'Already Reported',
  [ZHttpCodeSuccess.IMUsed]: 'IM Used'
};

/**
 * Friendly english descriptions of success codes.
 */
export const ZHttpCodeSuccessDescriptions: Record<ZHttpCodeSuccess, string> = {
  [ZHttpCodeSuccess.OK]: 'The request was successful.',
  [ZHttpCodeSuccess.Created]: 'The request has been fulfilled, resulting in the creation of a new resource.',
  [ZHttpCodeSuccess.Accepted]:
    'The request has been accepted for processing, but the processing has not been completed.',
  [ZHttpCodeSuccess.NonAuthoritativeInformation]:
    'The server is a transforming proxy that received an OK from its origin,but is returning a modified version of the response.',
  [ZHttpCodeSuccess.NoContent]: 'The server successfully processed the request and is not returning any content.',
  [ZHttpCodeSuccess.ResetContent]:
    'The server successfully processed the request, but is not returning any content.  The document view must be refreshed.',
  [ZHttpCodeSuccess.PartialContent]:
    'he server is delivering only part of the resource due to a range header sent by the client.',
  [ZHttpCodeSuccess.MultiStatus]:
    'The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.',
  [ZHttpCodeSuccess.AlreadyReported]:
    'The members of a DAV binding have already been enumerated in a preceding part of the response, and are not being included again.',
  [ZHttpCodeSuccess.IMUsed]:
    'The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.'
};
