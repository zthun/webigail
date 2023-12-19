/**
 * An informational response indicates that the request was received and understood.
 *
 * It is issued on a provisional basis while request processing continues. It alerts the
 * client to wait for a final response. The message consists only of the status line and
 * optional header fields, and is terminated by an empty line. As the HTTP/1.0 standard
 * did not define any 1xx status codes, servers must not[note 1] send a 1xx response to
 * an HTTP/1.0 compliant client except under experimental conditions.[4]
 */
export enum ZHttpCodeInformationalResponse {
  /**
   * The server has received the request headers and the client should proceed to send the
   * request body (in the case of a request for which a body needs to be sent; for example, a
   * POST request).
   *
   * Sending a large request body to a server after a request has been rejected
   * for inappropriate headers would be inefficient. To have a server check the request's headers,
   * a client must send Expect: 100-continue as a header in its initial request and receive a 100 Continue status
   * code in response before sending the body. If the client receives an error code such as 403 (Forbidden) or 405
   * (Method Not Allowed) then it shouldn't send the request's body. The response 417 Expectation Failed indicates
   * that the request should be repeated without the Expect header as it indicates that the server doesn't support
   * expectations (this is the case, for example, of HTTP/1.0 servers).
   */
  Continue = 100,
  /**
   * The requester has asked the server to switch protocols and the server has agreed to do so.
   */
  SwitchingProtocols = 101,
  /**
   * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to
   * complete the request. This code indicates that the server has received and is processing the request,
   * but no response is available yet.  This prevents the client from timing out and assuming the request was lost.
   */
  Processing = 102,
  /**
   * Used to return some response headers before final HTTP message.
   */
  EarlyHints = 103
}

/**
 * English friendly names of the codes.
 */
export const ZHttpCodeInformationalResponseNames: Record<ZHttpCodeInformationalResponse, string> = {
  [ZHttpCodeInformationalResponse.Continue]: 'Continue',
  [ZHttpCodeInformationalResponse.SwitchingProtocols]: 'Switching Protocols',
  [ZHttpCodeInformationalResponse.Processing]: 'Processing',
  [ZHttpCodeInformationalResponse.EarlyHints]: 'Early Hints'
};

/**
 * English friendly descriptions of the codes.
 */
export const ZHttpCodeInformationalResponseDescriptions: Record<ZHttpCodeInformationalResponse, string> = {
  [ZHttpCodeInformationalResponse.Continue]: 'The client should continue to send the request body.',
  [ZHttpCodeInformationalResponse.SwitchingProtocols]:
    'The requestor has asked the server to switch protocols and the server has agreed to do so.',
  [ZHttpCodeInformationalResponse.Processing]:
    'The server has received and is processing the request, but a response is not available yet.',
  [ZHttpCodeInformationalResponse.EarlyHints]:
    'There are some early response headers available for you before the final message.'
};
