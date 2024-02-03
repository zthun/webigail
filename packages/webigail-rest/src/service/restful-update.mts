/**
 * A restful service that can update resources.
 *
 * @param T -
 *        The type of resource being updated.
 */
export interface IZRestfulUpdate<T> {
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
}
