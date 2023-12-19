/**
 * This class of status code is intended for situations in which the error seems to have been caused by the client.
 *
 * Except when responding to a HEAD request, the server should include an entity containing an explanation
 * of the error situation, and whether it is a temporary or permanent condition. These status codes are applicable
 * to any request method. User agents should display any included entity to the user.
 */
export enum ZHttpCodeClient {
  /**
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, size too large, invalid request message framing,
   * or deceptive request routing).
   */
  BadRequest = 400,
  /**
   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed
   * or has not yet been provided.
   *
   * The response must include a WWW-Authenticate header field containing a challenge applicable to the
   * requested resource. See Basic access authentication and Digest access authentication.  401
   * semantically means "unauthenticated",[35] i.e. the user does not have the necessary credentials.
   *
   * Note: Some sites issue HTTP 401 when an IP address is banned from the website (usually the website domain)
   * and that specific address is refused permission to access a website.
   */
  Unauthorized = 401,
  /**
   * Reserved for future use.
   *
   * The original intention was that this code might be used as part of some form of digital cash or
   * micro-payment scheme, as proposed for example by GNU Taler, but that has not yet happened, and
   * this code is not usually used. Google Developers API uses this status if a particular developer
   * has exceeded the daily limit on requests
   */
  PaymentRequired = 402,
  /**
   * The request was valid, but the server is refusing action.
   *
   * The user might not have the necessary permissions for a resource, or may need an account of some sort.
   */
  Forbidden = 403,
  /**
   * The requested resource could not be found but may be available in the future.
   *
   * Subsequent requests by the client are permissible.
   */
  NotFound = 404,
  /**
   * A request method is not supported for the requested resource; for example, a GET
   * request on a form that requires data to be presented via POST, or a PUT request on
   * a read-only resource.
   */
  MethodNotAllowed = 405,
  /**
   * The requested resource is capable of generating only content not acceptable according
   * to the Accept headers sent in the request.
   */
  NotAcceptable = 406,
  /**
   * The client must first authenticate itself with the proxy.
   */
  ProxyAuthenticationRequired = 407,
  /**
   * The server timed out waiting for the request.
   *
   * According to HTTP specifications: "The client did not produce a request within the
   * time that the server was prepared to wait. The client MAY repeat the request without
   * modifications at any later time.
   */
  RequestTimeout = 408,
  /**
   * Indicates that the request could not be processed because of conflict in the request, such
   * as an edit conflict between multiple simultaneous updates.
   */
  Conflict = 409,
  /**
   * Indicates that the resource requested is no longer available and will not be available again.
   *
   * This should be used when a resource has been intentionally removed and the resource should be
   * purged. Upon receiving a 410 status code, the client should not request the resource in the
   * future. Clients such as search engines should remove the resource from their indices.  Most use
   * cases do not require clients and search engines to purge the resource, and a "404 Not Found" may
   * be used instead.
   */
  Gone = 410,
  /**
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  LengthRequired = 411,
  /**
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  PreconditionFailed = 412,
  /**
   * The request is larger than the server is willing or able to process. Previously called
   * "Request Entity Too Large".
   */
  PayloadTooLarge = 413,
  /**
   * The URI provided was too long for the server to process.
   *
   * Often the result of too much data being encoded as a query-string of
   * a GET request, in which case it should be converted to a POST request.
   * Called "Request-URI Too Long" previously.
   */
  URITooLong = 414,
  /**
   * The request entity has a media type which the server or resource does not support.
   *
   * For example, the client uploads an image as image/svg+xml, but the server requires that
   * images use a different format.
   */
  UnsupportedMediaType = 415,
  /**
   * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
   *
   * For example, if the client asked for a part of the file that lies beyond the end of the file.
   * Called "Requested Range Not Satisfiable" previously.
   */
  RangeNotSatisfiable = 416,
  /**
   * The server cannot meet the requirements of the Expect request-header field.
   */
  ExpectationFailed = 417,
  /**
   * This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper
   * Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers.
   *
   * The RFC specifies this code should be returned by teapots requested to brew coffee.  This HTTP
   * status is used as an Easter egg in some websites, including Google.com.
   */
  ImATeapot = 418,
  /**
   * The request was directed at a server that is not able to produce a response[53] (for example because of connection reuse).
   */
  MisdirectedRequest = 421,
  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UnProcessableEntity = 422,
  /**
   * The resource that is being accessed is locked.
   */
  Locked = 423,
  /**
   * The request failed because it depended on another request and that request failed.
   */
  FailedDependency = 424,
  /**
   * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
   */
  UpgradeRequired = 426,
  /**
   * The origin server requires the request to be conditional.
   *
   * Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it,
   * and PUTs it back to the server, when meanwhile a third party has modified the state on the server,
   * leading to a conflict.
   */
  PreconditionRequired = 428,
  /**
   * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
   */
  TooManyRequests = 429,
  /**
   * The server is unwilling to process the request because either an individual header field, or all the
   * header fields collectively, are too large.[
   */
  RequestHeaderFieldsTooLarge = 431,
  /**
   * A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the
   * requested resource.
   *
   * The code 451 was chosen as a reference to the novel Fahrenheit 451.
   */
  UnavailableForLegalReasons = 451
}

/**
 * English friendly names of the codes.
 */
export const ZHttpCodeClientNames: Record<ZHttpCodeClient, string> = {
  [ZHttpCodeClient.BadRequest]: 'Bad Request',
  [ZHttpCodeClient.Unauthorized]: 'Unauthorized',
  [ZHttpCodeClient.PaymentRequired]: 'Payment Required',
  [ZHttpCodeClient.Forbidden]: 'Forbidden',
  [ZHttpCodeClient.NotFound]: 'Not Found',
  [ZHttpCodeClient.MethodNotAllowed]: 'Method not Allowed',
  [ZHttpCodeClient.NotAcceptable]: 'Not Acceptable',
  [ZHttpCodeClient.ProxyAuthenticationRequired]: 'Proxy Authentication Required',
  [ZHttpCodeClient.RequestTimeout]: 'Request Timeout',
  [ZHttpCodeClient.Conflict]: 'Conflict',
  [ZHttpCodeClient.Gone]: 'Gone',
  [ZHttpCodeClient.LengthRequired]: 'Length Required',
  [ZHttpCodeClient.PreconditionFailed]: 'Precondition Failed',
  [ZHttpCodeClient.PayloadTooLarge]: 'Payload Too Large',
  [ZHttpCodeClient.URITooLong]: 'URI Too Long',
  [ZHttpCodeClient.UnsupportedMediaType]: 'Unsupported Media Type',
  [ZHttpCodeClient.RangeNotSatisfiable]: 'Range Not Satisfiable',
  [ZHttpCodeClient.ExpectationFailed]: 'Expectation Failed',
  [ZHttpCodeClient.ImATeapot]: 'I am a Teapot',
  [ZHttpCodeClient.MisdirectedRequest]: 'Misdirected Requested',
  [ZHttpCodeClient.UnProcessableEntity]: 'Entity Not Processable',
  [ZHttpCodeClient.Locked]: 'Locked',
  [ZHttpCodeClient.FailedDependency]: 'Failed Dependency',
  [ZHttpCodeClient.UpgradeRequired]: 'Upgrade Required',
  [ZHttpCodeClient.PreconditionRequired]: 'Precondition Required',
  [ZHttpCodeClient.TooManyRequests]: 'Too Many Requests',
  [ZHttpCodeClient.RequestHeaderFieldsTooLarge]: 'Request Header Fields Too Large',
  [ZHttpCodeClient.UnavailableForLegalReasons]: 'Unavailable for Legal Reasons'
};

/**
 * English friendly descriptions of HttpClientCodes
 */
export const ZHttpCodeClientDescriptions: Record<ZHttpCodeClient, string> = {
  [ZHttpCodeClient.BadRequest]: 'A bad request was sent.',
  [ZHttpCodeClient.Unauthorized]: 'You are not authenticated and cannot view this content.',
  [ZHttpCodeClient.PaymentRequired]: 'Payment is required',
  [ZHttpCodeClient.Forbidden]: 'You are not authorized to view this content.',
  [ZHttpCodeClient.NotFound]: 'The resource you are looking for could not be found.',
  [ZHttpCodeClient.MethodNotAllowed]: 'The requested operation was not allowed.',
  [ZHttpCodeClient.NotAcceptable]: 'The requested resource is not capable of generating the content for you.',
  [ZHttpCodeClient.ProxyAuthenticationRequired]: 'You must first authenticate your self with the proxy.',
  [ZHttpCodeClient.RequestTimeout]: 'The server timed out waiting for a request.  Please try again.',
  [ZHttpCodeClient.Conflict]: 'There was a conflict with request.  Try something else.',
  [ZHttpCodeClient.Gone]: 'The resource you requested is no longer available.',
  [ZHttpCodeClient.LengthRequired]:
    'Your request did not specify the length of its content, which is required by the requested resource.',
  [ZHttpCodeClient.PreconditionFailed]:
    'The server did not meet the requirements that was required to meet the request.',
  [ZHttpCodeClient.PayloadTooLarge]: 'The request is too large and the server cannot handle it.',
  [ZHttpCodeClient.URITooLong]: 'The URI provided was too long for the server to process.',
  [ZHttpCodeClient.UnsupportedMediaType]: 'The media type requested is not supported by the server.',
  [ZHttpCodeClient.RangeNotSatisfiable]:
    'A portion of the file was requested by the server cannot supply said portion.',
  [ZHttpCodeClient.ExpectationFailed]: 'The server cannot meet the requirements of the expectation made of it.',
  [ZHttpCodeClient.ImATeapot]:
    'Short and stout.  Here is my handle, here is my spout.  When I get all steamed up, hear me shout.  Tip me over and pour me out!',
  [ZHttpCodeClient.MisdirectedRequest]:
    'The request was directed at the server, but the server cannot produce a response.',
  [ZHttpCodeClient.UnProcessableEntity]:
    'The request was well-formed but was unable to be followed due to semantic errors.',
  [ZHttpCodeClient.Locked]: 'The resource that is being accessed is locked.',
  [ZHttpCodeClient.FailedDependency]:
    'The request failed because it depended on another request and that request failed.',
  [ZHttpCodeClient.UpgradeRequired]: 'The client needs to switch to a different protocol.',
  [ZHttpCodeClient.PreconditionRequired]: 'The origin server requires the request to be conditional.',
  [ZHttpCodeClient.TooManyRequests]: 'The user has sent too many requests in a given amount of time.',
  [ZHttpCodeClient.RequestHeaderFieldsTooLarge]:
    'The request cannot be processed because the collective header fields are too large.',
  [ZHttpCodeClient.UnavailableForLegalReasons]: 'Call your lawyer!'
};
