import { Buffer } from 'buffer';
import { last } from 'lodash';
import { ZMimeTypeApplication } from '../mime/mime-type-application.mjs';
import { ZSupportedMimeTypes } from '../mime/mime-type.mjs';

/**
 * Represents information about a data url.
 */
export interface IZDataUrlInfo {
  /**
   * The content information mime type.
   */
  mimeType: string;

  /**
   * The output encoding.
   */
  encoding: 'base64' | 'utf8';

  /**
   * The raw data buffer.
   */
  buffer: Buffer;
}

/**
 * Represents an object that is helpful in building a data url with support
 * for data encoding.
 */
export class ZDataUrlBuilder {
  /**
   * The representation of the data url object.
   */
  private _data: IZDataUrlInfo;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._data = {
      mimeType: '',
      encoding: 'utf8',
      buffer: Buffer.from('')
    };
  }

  /**
   * Parses an existing data url and sets all properties.
   *
   * @param url -
   *        The url to parse.
   *
   * @returns
   *        This object.
   */
  public parse(url: string): this {
    this._data = {
      mimeType: '',
      encoding: 'utf8',
      buffer: Buffer.from('')
    };

    if (!url.startsWith('data:')) {
      return this;
    }

    url = url.substring(5);
    const parts = url.split(',');

    if (parts.length < 2) {
      return this;
    }

    const [mimeType, ...bodyParts] = parts;
    let [type, ...params] = mimeType.split(';');

    const isBase64 = last(params) === 'base64';

    this._data.encoding = isBase64 ? 'base64' : 'utf8';

    if (isBase64) {
      params.pop();
    }

    if (!Object.hasOwnProperty.call(ZSupportedMimeTypes, type)) {
      type = ZMimeTypeApplication.OctetStream;
      params = [];
    }

    type = [type, ...params].join(';');

    this._data.mimeType = type;

    // Commas can be in the body.  Type this into chrome and you can
    // see that chrome actually parses it:  data:text/plain,cat,,,
    // We will support this here, but we're going to properly encode it.
    const body = bodyParts.join('%2C');
    this._data.buffer = isBase64 ? Buffer.from(body, 'base64') : Buffer.from(decodeURIComponent(body));
    return this;
  }

  /**
   * Sets the mime type.
   *
   * @param type -
   *        The mime type.
   *
   * @returns
   *        This object.
   */
  public mimeType(type: string): this {
    this._data.mimeType = type;
    return this;
  }

  /**
   * Sets the data buffer.
   *
   * @param data -
   *        The data to set.  If you pass a raw string, then the input encoding
   *        is expected to be utf8.
   * @returns
   *        This object.
   */
  public buffer(data: Buffer | string): this {
    this._data.buffer = typeof data === 'string' ? Buffer.from(data) : data;
    return this;
  }

  /**
   * Sets the output encoding.
   *
   * If you output encode the data as utf8, then it will be properly
   * escaped.
   *
   * @param encoding -
   *        The output encoding.
   *
   * @returns
   *        This object.
   */
  public encode(encoding: 'base64' | 'utf8'): this {
    this._data.encoding = encoding;
    return this;
  }

  /**
   * Builds the url string and returns it.
   *
   * @returns The url string.
   */
  public build(): string {
    const protocol = 'data';
    const modifier = this._data.encoding === 'base64' ? ';base64' : '';

    let raw = this._data.buffer.toString(this._data.encoding);

    if (this._data.encoding === 'utf8') {
      raw = encodeURIComponent(raw);

      // Note ! should be encoded as %21, but for uri's..it's not because
      // it's actually valid, but some servers don't accept ! as a character
      // and it must be encoded.  Just fix it here.
      raw = raw.split('!').join('%21');
    }

    return `${protocol}:${this._data.mimeType}${modifier},${raw}`;
  }

  /**
   * Gets the current information about the url being built.
   *
   * @returns The current information about the url being built.
   */
  public info(): IZDataUrlInfo {
    const other = { ...this._data };
    other.buffer = this._data.buffer.slice();
    return other;
  }
}
