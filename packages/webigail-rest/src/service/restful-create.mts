/**
 * A service that can be used to create resources.
 *
 * @param T -
 *        The type of resource being created.
 */
export interface IZRestfulCreate<T> {
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
}
