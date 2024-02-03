/**
 * A service that can be used to get resources.
 *
 * @param T -
 *        The type of resource being retrieved.
 */
export interface IZRestfulGet<T> {
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
}
