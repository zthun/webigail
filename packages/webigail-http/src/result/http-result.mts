import { ZHttpCodeSuccess } from './http-code-success.mjs';
import { ZHttpCode } from './http-code.mjs';

/**
 * Represents a result from an http request.
 */
export interface IZHttpResult<TResult = any> {
  /**
   * The status code.
   */
  status: ZHttpCode;

  /**
   * The set of headers that was returned.
   */
  headers: Record<string, any>;

  /**
   * The actual body result of the invocation.
   */
  data: TResult;
}

/**
 * Represents a builder for an IZHttpResult class.
 */
export class ZHttpResultBuilder<TData = any> {
  private _result: IZHttpResult<TData>;

  /**
   * Initializes a new instance of this object.
   *
   * @param data -
   *        The data result.
   */
  public constructor(data: TData) {
    this._result = {
      status: ZHttpCodeSuccess.OK,
      headers: {},
      data
    };
  }

  /**
   * Sets the data.
   *
   * @param data -
   *        The data to set.
   *
   * @returns
   *        This object.
   */
  public data(data: TData): this {
    this._result.data = data;
    return this;
  }

  /**
   * Sets the status code and the english description.
   *
   * @param code -
   *        The code to set.
   *
   * @returns
   *        This object.
   */
  public status(code: ZHttpCode): this {
    this._result.status = code;
    return this;
  }

  /**
   * Sets the return headers.
   *
   * @param headers -
   *        The headers to set.
   *
   * @returns
   *        This object.
   */
  public headers(headers: Record<string, any>): this {
    this._result.headers = headers;
    return this;
  }

  /**
   * Returns the built up result.
   *
   * @returns
   *        A shallow copy of the built up result.
   */
  public build(): IZHttpResult {
    return { ...this._result };
  }
}
