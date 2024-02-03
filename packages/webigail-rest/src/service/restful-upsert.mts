/**
 * A restful service that can upsert resources.
 *
 * @param T -
 *        The type of resource being created/updated.
 */
export interface IZRestfulUpsert<T> {
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
}
