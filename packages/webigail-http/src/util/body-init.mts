/**
 * A method that determines if an object conforms to a Request BodyInit shape.
 *
 * See the {@link BodyInit} interface for more information about the possible
 * shapes.
 *
 * @param obj -
 *        The object to test.
 *
 * @returns
 *        True if obj is a BodyInit shape, false otherwise.
 */
export function isBodyInit(obj: any): obj is BodyInit {
  return (
    obj == null ||
    typeof obj === 'string' ||
    obj instanceof Blob ||
    obj instanceof ArrayBuffer ||
    ArrayBuffer.isView(obj) ||
    obj instanceof FormData ||
    obj instanceof URLSearchParams ||
    obj instanceof ReadableStream
  );
}

/**
 * A helper method that converts an object to a BodyInit.
 *
 * If obj is not a BodyInit supported object, then it will
 * simply be converted to JSON.
 *
 * @param obj -
 *        The object to convert.
 *
 * @returns
 *        Obj as a body init serialization.  If obj is not
 *        compatible with a BodyInit shape, then it is converted
 *        to JSON.
 */
export function toBodyInit(obj: any): BodyInit {
  return isBodyInit(obj) ? obj : JSON.stringify(obj);
}
