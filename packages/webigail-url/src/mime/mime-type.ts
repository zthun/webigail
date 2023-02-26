import { keyBy } from 'lodash';
import { ZMimeTypeApplication } from './mime-type-application';
import { ZMimeTypeImage } from './mime-type-image';
import { ZMimeTypeText } from './mime-type-text';

/**
 * Mime types for file data.
 */
export type ZMimeType = ZMimeTypeApplication | ZMimeTypeText | ZMimeTypeImage;

/**
 * A mapping of supported mime types.
 */
export const ZSupportedMimeTypes = Object.freeze({
  ...{ '': 'text/plain;charset=ASCII' },
  ...keyBy(Object.values(ZMimeTypeApplication)),
  ...keyBy(Object.values(ZMimeTypeText)),
  ...keyBy(Object.values(ZMimeTypeImage))
});
