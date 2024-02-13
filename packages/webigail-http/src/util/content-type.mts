/**
 * A helper method that takes an HTTP Fetch Response and converts the body data based on its
 * content type.
 *
 * This will favor a blob as the default type.
 */
export function fromContentType(res: Response): Promise<any> {
  const contentType = res.headers.get('content-type');

  if (contentType === 'application/json' || contentType?.endsWith('+json')) {
    return res.json();
  }

  if (contentType?.startsWith('multipart/form-data')) {
    return res.formData();
  }

  if (contentType?.startsWith('text') || contentType?.endsWith('+xml')) {
    return res.text();
  }

  return res.blob();
}
