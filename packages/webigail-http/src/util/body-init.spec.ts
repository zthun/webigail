import { describe, expect, it } from 'vitest';
import { isBodyInit, toBodyInit } from './body-init.mjs';

describe('isBodyInit', () => {
  it('should be true for a undefined', () => {
    expect(isBodyInit(undefined)).toBeTruthy();
  });

  it('should be true for a null', () => {
    expect(isBodyInit(null)).toBeTruthy();
  });

  it('should be true for a string', () => {
    expect(isBodyInit('yes')).toBeTruthy();
  });

  it('should be true for a blob', () => {
    expect(isBodyInit(new Blob(['blob']))).toBeTruthy();
  });

  it('should be true for a file', () => {
    expect(isBodyInit(new File(['blob'], 'blob-y.txt'))).toBeTruthy();
  });

  it('should be true for an ArrayBuffer', async () => {
    expect(isBodyInit(await new Blob(['blob']).arrayBuffer())).toBeTruthy();
  });

  it('should be true for a Typed Array', () => {
    expect(isBodyInit(new Int8Array([0x04, 0xff, 0xaa, 0xbc]))).toBeTruthy();
  });

  it('should be true for a ReadableStream', () => {
    expect(isBodyInit(new ReadableStream())).toBeTruthy();
  });

  it('should be true for FormData', () => {
    expect(isBodyInit(new FormData())).toBeTruthy();
  });

  it('should be true for URLSearchParams', () => {
    expect(isBodyInit(new URLSearchParams())).toBeTruthy();
  });

  it('should be false for a generic array', () => {
    expect(isBodyInit([1, 2, 3, 4])).toBeFalsy();
  });

  it('should be false for a basic number', () => {
    expect(isBodyInit(0)).toBeFalsy();
  });

  it('should be false for a symbol', () => {
    expect(isBodyInit(Symbol())).toBeFalsy();
  });

  it('should be false for a JavaScript object', () => {
    expect(isBodyInit({ message: 'not-a-body-init' })).toBeFalsy();
  });
});

describe('toBodyInit', () => {
  it('should return the object if it is already a BodyInit shape', () => {
    const expected = 'this-is-already-a-body-init-shape';
    expect(toBodyInit(expected)).toEqual(expected);
  });

  it('should return the JSON representation of the object if it is not a BodyInit shape', () => {
    const shape = { message: 'this-is-not-a-body-init-shape' };
    const expected = JSON.stringify(shape);
    expect(toBodyInit(shape)).toEqual(expected);
  });
});
