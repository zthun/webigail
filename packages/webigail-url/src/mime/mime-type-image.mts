/* cspell:disable */

/**
 * Mime types for images.
 */
export enum ZMimeTypeImage {
  /**
   * Good choice for lossless animation sequences (GIF is less performant). AVIF and
   * WebP have better performance but less broad browser support.
   */
  APNG = 'image/apng',

  /**
   * Good choice for both images and animated images due to high performance and
   * royalty free image format. It offers much better compression than PNG or JPEG
   * with support for higher color depths, animated frames, transparency etc.
   *
   * Note that when using AVIF, you should include fallbacks to formats with
   * better browser support (i.e. using the <picture> element).
   */
  AVIF = 'image/avif',

  /**
   * Good choice for simple images and animations. Prefer PNG for lossless and
   * indexed still images, and consider WebP, AVIF or APNG for animation sequences.
   */
  GIF = 'image/gif',

  /**
   * Good choice for lossy compression of still images (currently the most popular). Prefer
   * PNG when more precise reproduction of the image is required, or WebP/AVIF if both better
   * reproduction and higher compression are required.
   */
  JPEG = 'image/jpeg',

  /**
   * PNG is preferred over JPEG for more precise reproduction of source images, or when
   * transparency is needed. WebP/AVIF provide even better compression and reproduction,
   * but browser support is more limited.
   */
  PNG = 'image/png',

  /**
   * Vector image format; ideal for user interface elements, icons, diagrams, etc., that
   * must be drawn accurately at different sizes.
   */
  SVG = 'image/svg+xml',

  /**
   * Excellent choice for both images and animated images. WebP offers much better compression
   * than PNG or JPEG with support for higher color depths, animated frames, transparency etc.
   * AVIF offers slightly better compression, but is not quite as well-supported in browsers
   * and does not support progressive rendering.
   */
  WebP = 'image/webp'
}
