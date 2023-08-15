import { Test } from '@nestjs/testing';
import { ZHttpService } from '@zthun/webigail-http';
import { describe, expect, it } from 'vitest';
import { ZHttpModule, ZHttpServiceToken } from './http-module';

describe('ZHttpModule', () => {
  const createTestTarget = async () => {
    const _target = await Test.createTestingModule({
      imports: [ZHttpModule]
    }).compile();

    return _target;
  };

  it('should export the http service as a token', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.resolve(ZHttpServiceToken);
    // Assert.
    expect(actual).toBeInstanceOf(ZHttpService);
  });

  it('should export the http service as a class type', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.resolve(ZHttpService);
    // Assert.
    expect(actual).toBeInstanceOf(ZHttpService);
  });
});
