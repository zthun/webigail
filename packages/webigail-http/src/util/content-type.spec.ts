import { describe, expect, it } from 'vitest';
import { toBodyInit } from './body-init.mjs';
import { fromContentType } from './content-type.mjs';

describe('fromContentType', () => {
  const shouldReturnData = async (expected: any, body: BodyInit, contentType: string) => {
    // Arrange.
    const res = new Response(body, { headers: { 'content-type': contentType } });
    // Act.
    const actual = await fromContentType(res);
    // Assert.
    expect(actual).toEqual(expected);
  };

  it('should return json for application/json', async () => {
    const expected = { message: 'this-should-parse-from-json' };
    await shouldReturnData(expected, toBodyInit(expected), 'application/json');
  });

  it('should return json if the content type ends with +json', async () => {
    const expected = { tips: 'whatever-this-type-is' };
    await shouldReturnData(expected, toBodyInit(expected), 'application/alto-tips+json');
  });

  it('should return text for the text category', async () => {
    const expected = 'this is basic text';
    await shouldReturnData(expected, expected, 'text/plain');
  });

  it('should return text if the content type ends in +xml', async () => {
    const expected = '<element>Some XML Schema</element>';
    await shouldReturnData(expected, expected, 'application/atom+xml');
  });

  it('should return form data if the content type is multipart/form-data', async () => {
    // Arrange.
    const expected = new FormData();
    expected.append('key', 'value');
    const res = new Response(expected);
    // Act.
    const actual = await fromContentType(res);
    const fd = actual as FormData;
    // Assert.
    expect(fd.get('key')).toEqual('value');
  });

  it('should return a blob by default', async () => {
    const expected = new Blob([new Uint8Array([1, 2, 3, 4])], { type: 'application/octet-stream' });
    await shouldReturnData(expected, expected, expected.type);
  });
});
