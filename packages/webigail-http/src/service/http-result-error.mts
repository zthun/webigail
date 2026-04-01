import { getHttpCodeName, type ZHttpCode } from "../result/http-code.mjs";
import type { IZHttpResult } from "../result/http-result.mjs";

export class ZHttpResultError extends Error implements IZHttpResult {
  public readonly status: ZHttpCode;
  public readonly headers: Record<string, any>;
  public readonly data: any;

  public constructor(result: IZHttpResult) {
    super(getHttpCodeName(result.status));

    this.status = result.status;
    this.headers = result.headers;
    this.data = result.data;
  }
}
