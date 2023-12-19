/**
 * This class of status code indicates the client must take additional action to complete the request.
 *
 * Many of these status codes are used in URL redirection. A user agent may carry out the additional
 * action with no user interaction only if the method used in the second request is GET or HEAD.
 * A user agent may automatically redirect a request. A user agent should detect and intervene
 * to prevent cyclical redirects.
 */
export enum ZHttpCodeRedirection {
  /**
   * Indicates multiple options for the resource from which the client may choose
   * (via agent-driven content negotiation).
   *
   * For example, this code could be used to present multiple video format options, to
   * list files with different filename extensions, or to suggest word-sense disambiguation.
   */
  MultipleChoices = 300,
  /**
   * This and all future requests should be directed to the given URI.
   */
  MovedPermanently = 301,
  /**
   * Tells the client to look at (browse to) another url. 302 has been superseded by 303 and 307.
   * This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945)
   * required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"),
   * [22] but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1
   * added status codes 303 and 307 to distinguish between the two behaviors.[23] However, some Web applications
   * and frameworks use the 302 status code as if it were the 303.
   */
  Found = 302,
  /**
   * The response to the request can be found under another URI using the GET method.
   *
   * When received in response to a POST (or PUT/DELETE), the client should presume
   * that the server has received the data and should issue a new GET request to
   * the given URI.
   */
  SeeOther = 303,
  /**
   * Indicates that the resource has not been modified since the version specified by the request headers
   * If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since
   * the client still has a previously-downloaded copy.
   */
  NotModified = 304,
  /**
   * The requested resource is available only through a proxy, the address for which is provided in the response.
   *
   * Many HTTP clients (such as Mozilla[27] and Internet Explorer) do not correctly handle responses with
   * this status code, primarily for security reasons.
   */
  UseProxy = 305,
  /**
   * No longer used. Originally meant "Subsequent requests should use the specified proxy.
   */
  SwitchProxy = 306,
  /**
   * In this case, the request should be repeated with another URI; however, future requests
   * should still use the original URI.
   *
   * In contrast to how 302 was historically implemented, the request method is not allowed to be
   * changed when reissuing the original request. For example, a POST request should be repeated using
   * another POST request.
   */
  TemporaryRedirect = 307,
  /**
   * The request and all future requests should be repeated using another URI.
   *
   * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
   * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
   */
  PermanentRedirect = 308
}

/**
 * English friendly names of the redirection codes.
 */
export const ZHttpCodeRedirectionNames: Record<ZHttpCodeRedirection, string> = {
  [ZHttpCodeRedirection.MultipleChoices]: 'Multiple Choices',
  [ZHttpCodeRedirection.MovedPermanently]: 'Moved Permanently',
  [ZHttpCodeRedirection.Found]: 'Found',
  [ZHttpCodeRedirection.SeeOther]: 'See Other',
  [ZHttpCodeRedirection.NotModified]: 'Not Modified',
  [ZHttpCodeRedirection.UseProxy]: 'Use Proxy',
  [ZHttpCodeRedirection.SwitchProxy]: 'Switch Proxy',
  [ZHttpCodeRedirection.TemporaryRedirect]: 'Temporary Redirect',
  [ZHttpCodeRedirection.PermanentRedirect]: 'Permanent Redirect'
};

/**
 * English friendly descriptions of the redirection codes.
 */
export const ZHttpCodeRedirectionDescriptions: Record<ZHttpCodeRedirection, string> = {
  [ZHttpCodeRedirection.MultipleChoices]:
    'Indicates multiple options for the resource from which the client may choose.',
  [ZHttpCodeRedirection.MovedPermanently]: 'This and all future requests should be directed to the given URI.',
  [ZHttpCodeRedirection.Found]: 'Tells the client to look at another url',
  [ZHttpCodeRedirection.SeeOther]: 'The response to the request can be found under another URI using the GET method.',
  [ZHttpCodeRedirection.NotModified]:
    'Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.',
  [ZHttpCodeRedirection.UseProxy]:
    'The requested resource is available only through a proxy, the address for which is provided in the response.',
  [ZHttpCodeRedirection.SwitchProxy]:
    'No longer used. Originally meant "Subsequent requests should use the specified proxy.',
  [ZHttpCodeRedirection.TemporaryRedirect]:
    'In this case, the request should be repeated with another URI; however, future requests should still use the original URI.',
  [ZHttpCodeRedirection.PermanentRedirect]: 'The request and all future requests should be repeated using another URI.'
};
