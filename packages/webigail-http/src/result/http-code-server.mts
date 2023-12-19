/**
 * The server failed to fulfil a request.
 *
 * Response status codes beginning with the digit "5" indicate
 * cases in which the server is aware that it has encountered an
 * error or is otherwise incapable of performing the request. Except
 * when responding to a HEAD request, the server should include an entity
 * containing an explanation of the error situation, and indicate whether it
 * is a temporary or permanent condition. Likewise, user agents should
 * display any included entity to the user. These response codes are applicable
 * to any request method.
 */
export enum ZHttpCodeServer {
  /**
   * A generic error message, given when an unexpected condition was encountered
   * and no more specific message is suitable.
   */
  InternalServerError = 500,
  /**
   * The server either does not recognize the request method, or it lacks the ability to
   * fulfil the request. Usually this implies future availability (e.g., a new feature of
   * a web-service API).
   */
  NotImplemented = 501,
  /**
   * The server was acting as a gateway or proxy and received an invalid response
   * from the upstream server.
   */
  BadGateway = 502,
  /**
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   * Generally, this is a temporary state.
   */
  ServiceUnavailable = 503,
  /**
   * The server was acting as a gateway or proxy and did not receive a timely response from
   * the upstream server.
   */
  GatewayTimeout = 504,
  /**
   * The server does not support the HTTP protocol version used in the request.
   */
  HttpVersionNotSupported = 505,
  /**
   * Transparent content negotiation for the request results in a circular reference.
   */
  VariantAlsoNegotiates = 506,
  /**
   * The server is unable to store the representation needed to complete the request.
   */
  InsufficientStorage = 507,
  /**
   * The server detected an infinite loop while processing the request.
   */
  LoopDetected = 508,
  /**
   * Further extensions to the request are required for the server to fulfil it.
   */
  NotExtended = 510,
  /**
   * The client needs to authenticate to gain network access. Intended for use by
   * intercepting proxies used to control access to the network.
   */
  NetworkAuthenticationRequired = 511
}

/**
 * English friendly names of the server codes.
 */
export const ZHttpCodeServerNames: Record<ZHttpCodeServer, string> = {
  [ZHttpCodeServer.InternalServerError]: 'Internal Server Error',
  [ZHttpCodeServer.NotImplemented]: 'Not Implemented',
  [ZHttpCodeServer.BadGateway]: 'Bad Gateway',
  [ZHttpCodeServer.ServiceUnavailable]: 'Service Unavailable',
  [ZHttpCodeServer.GatewayTimeout]: 'Gateway Timeout',
  [ZHttpCodeServer.HttpVersionNotSupported]: 'HTTP Version Not Supported',
  [ZHttpCodeServer.VariantAlsoNegotiates]: 'Variant Also Negotiates',
  [ZHttpCodeServer.InsufficientStorage]: 'Insufficient Storage',
  [ZHttpCodeServer.LoopDetected]: 'Loop Detected',
  [ZHttpCodeServer.NotExtended]: 'Not Extended',
  [ZHttpCodeServer.NetworkAuthenticationRequired]: 'Network Authentication Required'
};

/**
 * English friendly names of the server codes.
 */
export const ZHttpCodeServerDescriptions: Record<ZHttpCodeServer, string> = {
  [ZHttpCodeServer.InternalServerError]: 'An unexpected condition was encountered on the server.',
  [ZHttpCodeServer.NotImplemented]:
    'The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).',
  [ZHttpCodeServer.BadGateway]:
    ' The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
  [ZHttpCodeServer.ServiceUnavailable]:
    'The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.',
  [ZHttpCodeServer.GatewayTimeout]:
    'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
  [ZHttpCodeServer.HttpVersionNotSupported]:
    'The server does not support the HTTP protocol version used in the request.',
  [ZHttpCodeServer.VariantAlsoNegotiates]:
    ' Transparent content negotiation for the request results in a circular reference.',
  [ZHttpCodeServer.InsufficientStorage]:
    'The server is unable to store the representation needed to complete the request.',
  [ZHttpCodeServer.LoopDetected]: 'The server detected an infinite loop while processing the request.',
  [ZHttpCodeServer.NotExtended]: 'Further extensions to the request are required for the server to fulfil it.',
  [ZHttpCodeServer.NetworkAuthenticationRequired]: 'The client needs to authenticate to gain network access.'
};
