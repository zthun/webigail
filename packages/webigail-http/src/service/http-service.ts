import axios, { AxiosError } from 'axios';

import { IZHttpRequest } from '../request/http-request';
import { ZHttpCodeServer } from '../result/http-code-server';
import { IZHttpResult, ZHttpResultBuilder } from '../result/http-result';

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
      const res = await axios({
        url: req.url,
        method: req.method,
        data: req.body,
        timeout: req.timeout,
        headers: req.headers
      });
      return new ZHttpResultBuilder(res.data).headers(res.headers).status(res.status).build();
    } catch (e) {
      const error = e as AxiosError;

      let builder = new ZHttpResultBuilder<any>(null).headers({});

      if (error.response) {
        // A call was made to the server and the status falls outside the accepted success range.
        builder = builder.headers(error.response.headers).status(error.response.status).data(error.response.data);
      } else if (error.request) {
        // The request was made but the server was never hit.
        builder = builder
          .status(ZHttpCodeServer.ServiceUnavailable)
          .data('The target endpoint could not be reached.  You may need to try again later.');
      } else {
        // Some other error occurred.
        builder = builder
          .status(ZHttpCodeServer.InternalServerError)
          .data(error.message || 'An unexpected error occurred.');
      }

      return Promise.reject(builder.build());
    }
  }
}
