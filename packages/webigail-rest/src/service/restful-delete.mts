/**
 * A service that can be used to delete resources.
 */
export interface IZRestfulDelete {
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
