import axios, { AxiosError } from 'axios';

import { IZHttpRequest } from '../request/http-request.mjs';
import { ZHttpCodeServer } from '../result/http-code-server.mjs';
import { IZHttpResult, ZHttpResultBuilder } from '../result/http-result.mjs';

/**
 * Represents a service that makes http invocations.
 */
export interface IZHttpService {
  /**
   * Makes the request.
   *
   * @param req -
   *        The request object to make.
   *
   * @returns
   *        A promise that resolves the request if a 200 code is returned, or
   *        rejects if a 400 or 500 code is returned.  The request is
   *        rerouted if a 300 code is returned.
   */
  request<TResult = any, TBody = any>(req: IZHttpRequest<TBody>): Promise<IZHttpResult<TResult>>;
}

/**
 * Represents an axios based implementation of the http service.
 */
export class ZHttpService implements IZHttpService {
  /**
   * Invokes the request with a real http service.
   *
   * @param req -
   *        The request information to make.
   */
  public async request<TResult = any, TBody = any>(req: IZHttpRequest<TBody>): Promise<IZHttpResult<TResult>> {
    try {
      const res = await axios(req.url, {
        method: req.method,
        data: req.body,
        timeout: req.timeout,
        headers: req.headers
      });
      return new ZHttpResultBuilder(res.data).headers(res.headers).status(res.status).build();
    } catch (e) {
      const error = e as AxiosError;

      let builder = new ZHttpResultBuilder<any>(null)
        .headers(error.response?.headers)
        .status(error.response?.status || ZHttpCodeServer.InternalServerError)
        .data(error.response?.data || error.message);

      if (error.response == null && error.request) {
        // The request was made but the server was never hit.
        builder = builder.status(ZHttpCodeServer.ServiceUnavailable);
      }

      return Promise.reject(builder.build());
    }
  }
}
