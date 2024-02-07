/**
 * Represents an available method for an http invocation.
 */
export enum ZHttpMethod {
  /**
   * GET
   *
   * Used for reads
   */
  Get = 'get',

  /**
   * PUT
   *
   * Used for updates and can combine creates.
   */
  Put = 'put',

  /**
   * POST
   *
   * Use for create.
   */
  Post = 'post',

  /**
   * DELETE.
   *
   * Used for....delete..duh.
   */
  Delete = 'delete',

  /**
   * PATCH.
   *
   * Used for updates but only
   * partials of objects.
   */
  Patch = 'patch',

  /**
   * OPTIONS
   *
   * Used to retrieve the available methods and
   * accessors for a single api.  Normally used
   * by the browser.
   */
  Options = 'options',

  /**
   * HEAD
   *
   * Used for metadata.
   */
  Head = 'head'
}

/**
 * Represents a http request.
 */
export interface IZHttpRequest<TBody = any> {
  /**
   * The method, or verb, to invoke the request with.
   */
  method: ZHttpMethod;

  /**
   * The url to target.
   */
  url: string;

  /**
   * The post body.
   *
   * Only should really be used for POST style
   * calls which accept a body.
   */
  body?: TBody;

  /**
   * Request headers.
   */
  headers?: Record<string, string>;

  /**
   * The timeout before the rest method fails
   */
  timeout?: number;
}

/**
 * Represents a builder for an http request.
 */
export class ZHttpRequestBuilder<TBody = any> {
  private _request: IZHttpRequest<TBody>;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._request = {
      method: ZHttpMethod.Get,
      url: ''
    };
  }

  /**
   * Sets the method.
   *
   * @param method -
   *        The method to set.
   * @param body -
   *        The post, put, or patch body.
   *
   * @returns
   *        This object.
   */
  private _method(method: ZHttpMethod, body?: TBody): this {
    this._request.method = method;

    this._request.body = body;

    if (this._request.body === undefined) {
      delete this._request.body;
    }
    return this;
  }

  /**
   * Constructs a get request.
   *
   * @returns
   *        This object.
   */
  public get: () => this = this._method.bind(this, ZHttpMethod.Get);

  /**
   * Constructs a post request.
   *
   * @returns
   *        This object.
   */
  public post: (body?: TBody) => this = this._method.bind(this, ZHttpMethod.Post);

  /**
   * Constructs a put request.
   *
   * @returns
   *        This object.
   */
  public put: (body?: TBody) => this = this._method.bind(this, ZHttpMethod.Put);

  /**
   * Constructs a delete request.
   *
   * @returns
   *        This object.
   */
  public delete: () => this = this._method.bind(this, ZHttpMethod.Delete);

  /**
   * Constructs a patch request.
   *
   * @returns
   *        This object.
   */
  public patch: (body?: TBody) => this = this._method.bind(this, ZHttpMethod.Patch);

  /**
   * Constructs a options request.
   *
   * @returns
   *        This object.
   */
  public options: () => this = this._method.bind(this, ZHttpMethod.Options);

  /**
   * Constructs a head request.
   *
   * @returns
   *        This object.
   */
  public head: () => this = this._method.bind(this, ZHttpMethod.Head);

  /**
   * Sets the url to make the request from.
   *
   * @param url -
   *        The url to make the request to.
   *
   * @returns
   *        This object.
   */
  public url(url: string): this {
    this._request.url = url;
    return this;
  }

  /**
   * Sets the timeout for the url.
   *
   * @param ms -
   *        The total number of milliseconds to wait.
   *
   * @returns
   *        The object.
   */
  public timeout(ms: number): this {
    this._request.timeout = ms;
    return this;
  }

  /**
   * Sets the headers.
   *
   * @param headers -
   *        The headers to set.
   *
   * @returns
   *        This object.
   */
  public headers(headers: Record<string, string>): this {
    this._request.headers = headers;
    return this;
  }

  /**
   * Sets an individual header.
   *
   * @param key -
   *        The header key to set.
   * @param value -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public header(key: string, value: string | number | boolean | null): this {
    this._request.headers = this._request.headers || {};

    if (value == null) {
      delete this._request.headers[key];
    } else {
      this._request.headers[key] = `${value}`;
    }

    return this;
  }

  /**
   * Copies other to this object.
   *
   * @param other -
   *        The request to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZHttpRequest): this {
    this._request = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the constructed request.
   *
   * @returns
   *        The constructed request.
   */
  public build(): IZHttpRequest {
    return JSON.parse(JSON.stringify(this._request));
  }
}
