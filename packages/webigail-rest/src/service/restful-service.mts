import { IZDataRequest, IZDataSource } from '@zthun/helpful-query';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';

/**
 * A service that conforms to restful standards.
 */
export interface IZRestfulService<T> extends IZDataSource<T> {
  /**
   * Retrieves a single item by it's identification.
   *
   * This uses a GET verb.
   *
   * @param identification -
   *        The identification of the resource to retrieve.
   *
   * @returns
   *        The json representation of the entity.
   */
  get(identification: number | string): Promise<T>;

  /**
   * Creates a new entity.
   *
   * This uses a POST verb.
   *
   * @param body -
   *        The post body that represents the resource to create.
   *
   * @returns
   *        The resource that was created.
   */
  create(body: T): Promise<T>;

  /**
   * Creates a new entity or updates an existing entity.
   *
   * This is determined by the body parameters on whether
   * or not an entity already exists.
   *
   * This uses the PUT verb.
   *
   * @param body -
   *        The post body that represents the resource to create
   *        or update.
   *
   * @returns
   *        The resource that was created or updated.
   */
  upsert(body: T): Promise<T>;

  /**
   * Partially updates an existing resource entity.
   *
   * This uses the PATCH verb.
   *
   * @param identification -
   *        The identification of the resource to update.
   * @param fields -
   *        The partial fields to update.
   *
   * @returns
   *        The resource that was updated.
   */
  update(identification: string, fields: Partial<T>): Promise<T>;

  /**
   * Deletes a resource entity.
   *
   * This uses the DELETE verb.
   *
   * @param identification -
   *        The identification of the resource to delete.
   */
  delete(identification: string): Promise<void>;
}

/**
 * A factory for constructing basic http request builders.
 *
 * This is used to create a common construction for http requests
 * that contain common options like headers and timeouts.
 */
export type ZHttpRequestFactory = () => ZHttpRequestBuilder;

/**
 * A generic implementation of a restful service that assumes all verbs are implemented.
 *
 * This can be used to invoke a service that is only partially implemented.  If your service,
 * for example, is read only, then create, upsert, update, and delete should all return
 * not found or forbidden errors.
 */
export class ZRestfulService<T> implements IZRestfulService<T> {
  /**
   * Initializes a new instance of this object.
   *
   * @param _http -
   *        The http service to use when invoking the RESTful service.
   * @param _endpointUrl -
   *        The root url of the endpoint to hit.  This can include params
   *        to send them with every request, but standard params of page,
   *        size, search, filter, and sort will be overridden depending on
   *        which method is being invoked.
   * @param _request -
   *        The base request to use when constructing requests in the http
   *        service.
   */
  public constructor(
    private readonly _http: IZHttpService,
    private readonly _endpointUrl: string,
    private readonly _request = new ZHttpRequestBuilder<T>().build()
  ) {}

  /**
   * Gets the final endpoint for a resource.
   *
   * @param identification -
   *        The identification of a single resource.  If this is falsy, then
   *        the entire data scope is used.
   *
   * @returns
   *        A url builder that points to the target resource endpoint.
   */
  public endpoint(identification?: number | string) {
    const url = new ZUrlBuilder().parse(this._endpointUrl);
    return identification ? url.append(`${identification}`) : url;
  }

  public async count(req: IZDataRequest): Promise<number> {
    const url = this.endpoint().page(1).size(1).search(req.search).build();
    const r = new ZHttpRequestBuilder().copy(this._request).get().url(url).build();
    const { data: page } = await this._http.request<any>(r);
    return page.count;
  }

  public async retrieve(req: IZDataRequest): Promise<T[]> {
    const url = this.endpoint().page(req.page).size(req.size).search(req.search).build();
    const r = new ZHttpRequestBuilder().copy(this._request).get().url(url).build();
    const { data: page } = await this._http.request<any>(r);
    return page.data ?? page.result;
  }

  public async get(identification: number | string): Promise<T> {
    const url = this.endpoint(identification).build();
    const r = new ZHttpRequestBuilder().copy(this._request).get().url(url).build();
    const { data } = await this._http.request<T>(r);
    return data;
  }

  public async create(body: T): Promise<T> {
    const url = this.endpoint().build();
    const r = new ZHttpRequestBuilder<T>().copy(this._request).post(body).url(url).build();
    const { data } = await this._http.request<T>(r);
    return data;
  }

  public async upsert(body: T): Promise<T> {
    const url = this.endpoint().build();
    const r = new ZHttpRequestBuilder<T>().copy(this._request).put(body).url(url).build();
    const { data } = await this._http.request<T>(r);
    return data;
  }

  public async update(identification: number | string, fields: Partial<T>): Promise<T> {
    const url = this.endpoint(identification).build();
    const r = new ZHttpRequestBuilder<Partial<T>>().copy(this._request).patch(fields).url(url).build();
    const { data } = await this._http.request<T>(r);
    return data;
  }

  public async delete(identification: number | string): Promise<void> {
    const url = this.endpoint(identification).build();
    const r = new ZHttpRequestBuilder<undefined>().copy(this._request).delete().url(url).build();
    await this._http.request(r);
  }
}
