import type { IZDataRequest } from "@zthun/helpful-query";
import { ZFilterSerialize, ZSortSerialize } from "@zthun/helpful-query";
import { ZUrlBuilder } from "@zthun/webigail-url";

/**
 * Represents a decorator that can build a url for a restful endpoint
 * given an existing base url.
 */
export class ZRestfulUrlBuilder {
  private _url: ZUrlBuilder;

  /**
   * Initializes a new instance of this object.
   */
  public constructor(baseUrl: string) {
    this._url = new ZUrlBuilder().parse(baseUrl);
  }

  /**
   * Adds the request parameters to the url.
   *
   * This will add the page, size, search, filter, and sort parameters to the url if they are defined.
   *
   * @param request -
   *        The request to add to the url.
   * @returns
   *        This object.
   */
  public from(request: IZDataRequest): this {
    this._url = this._url
      .page(request.page)
      .size(request.size)
      .search(request.search)
      .filter(new ZFilterSerialize().serialize(request.filter))
      .sort(new ZSortSerialize().serialize(request.sort));
    return this;
  }

  /**
   * Updates the url to optimize to retrieve a count.
   *
   * This will add the size and page parameters to the url and remove the sort parameter.
   *
   * @returns
   *        This object.
   */
  public count(): this {
    this._url = this._url.size(1).page(1).sort(null);
    return this;
  }

  /**
   * Returns the built url.
   *
   * @returns
   *      The built url.
   */
  public build(): string {
    return this._url.build();
  }
}
