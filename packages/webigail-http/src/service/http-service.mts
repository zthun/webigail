import fetch from 'cross-fetch';

import { IZHttpRequest } from '../request/http-request.mjs';
import { ZHttpCodeClient } from '../result/http-code-client.mjs';
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
      const res = await fetch(req.url, {
        method: req.method,
        body: req.body ? JSON.stringify(req.body) : undefined,
        headers: req.headers,
        redirect: 'follow'
      });

      const data = await this._body(res);
      const result = new ZHttpResultBuilder(data).headers(res.headers).status(res.status).build();
      return res.ok ? Promise.resolve(result) : Promise.reject(result);
    } catch (e) {
      let result = new ZHttpResultBuilder(e.message).headers().status(ZHttpCodeServer.InternalServerError);

      if (e.code === 'ENOTFOUND') {
        // The request was made, but some DNS lookup failed.
        result = result.status(ZHttpCodeClient.NotFound);
      }

      return Promise.reject(result.build());
    }
  }

  private async _body(res: Response): Promise<any> {
    const contentType = res.headers.get('content-type');

    if (contentType === 'application/json') {
      return res.json();
    }

    return res.text();
  }
}
