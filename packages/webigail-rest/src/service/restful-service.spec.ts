import { createGuid } from '@zthun/helpful-fn';
import {
  ZDataRequestBuilder,
  ZFilterLogicBuilder,
  ZFilterSerialize,
  ZFilterUnaryBuilder,
  ZPageBuilder,
  ZSortBuilder,
  ZSortSerialize
} from '@zthun/helpful-query';
import {
  ZHttpCodeSuccess,
  ZHttpMethod,
  ZHttpRequestBuilder,
  ZHttpResultBuilder,
  ZHttpServiceMock
} from '@zthun/webigail-http';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZRestfulService } from './restful-service.mjs';

interface IPokemonType {
  id?: string;
  name: string;
}

describe('ZRestfulService', () => {
  let http: ZHttpServiceMock;
  let fire: IPokemonType;
  let water: IPokemonType;
  let electric: IPokemonType;
  let types: IPokemonType[];

  const createTestTarget = () => new ZRestfulService<IPokemonType>(http, 'https://pokeapi.co/api/v2/type');

  beforeEach(() => {
    http = new ZHttpServiceMock();

    fire = { id: createGuid(), name: 'fire' };
    water = { id: createGuid(), name: 'water' };
    electric = { id: createGuid(), name: 'electric' };

    types = [fire, water, electric];
  });

  describe('Retrieve (List)', () => {
    it('should return the items from the http service', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(1).size(20).search('ele').build();
      const expected = new ZPageBuilder().singleton(electric).build();
      http.set(
        target.endpoint().page(request.page).size(request.size).search(request.search).build(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(expected).build()
      );
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual([electric]);
    });

    it('should support a result key on the page', async () => {
      // Arrange.
      const target = createTestTarget();
      const filter = new ZFilterLogicBuilder()
        .and()
        .clause(new ZFilterUnaryBuilder().isNotNull().subject('name').build())
        .clause(new ZFilterUnaryBuilder().isNotNull().subject('id').build())
        .build();
      const sort = new ZSortBuilder().ascending('sort').build();
      const request = new ZDataRequestBuilder().page(1).size(20).search('ele').filter(filter).sort(sort).build();
      const expected = { count: 1, result: [electric] };
      http.set(
        target
          .endpoint()
          .page(request.page)
          .size(request.size)
          .search(request.search)
          .filter(new ZFilterSerialize().serialize(filter))
          .sort(new ZSortSerialize().serialize(sort))
          .build(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(expected).build()
      );
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual([electric]);
    });
  });

  describe('Count', () => {
    it('should return the total number of items across all pages', async () => {
      // Arrange.
      const target = createTestTarget();
      const filter = new ZFilterLogicBuilder()
        .and()
        .clause(new ZFilterUnaryBuilder().isNotNull().subject('name').build())
        .clause(new ZFilterUnaryBuilder().isNotNull().subject('id').build())
        .build();
      const expected = new ZPageBuilder<any>().data([fire]).count(types.length).build();
      http.set(
        target.endpoint().page(1).size(1).search('fir').filter(new ZFilterSerialize().serialize(filter)).build(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(expected).build()
      );
      // Act.
      const actual = await target.count(new ZDataRequestBuilder().search('fir').filter(filter).build());
      // Assert.
      expect(actual).toEqual(expected.count);
    });
  });

  describe('Get', () => {
    it('should retrieve a specific resource', async () => {
      // Arrange.
      const target = createTestTarget();
      http.set(
        target.endpoint().append(String(electric.id)).build(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(electric).build()
      );
      // Act.
      const actual = await target.get(electric.id!);
      // Assert.
      expect(actual).toEqual(electric);
    });
  });

  describe('Create', () => {
    it('should attempt to create a resource', async () => {
      // Arrange.
      const target = createTestTarget();
      const dragon = { name: 'dragon' };
      http.set(target.endpoint().build(), ZHttpMethod.Post, new ZHttpResultBuilder(dragon).build());
      // Act.
      const actual = await target.create(dragon);
      // Assert.
      expect(actual).toEqual(dragon);
    });
  });

  describe('Upsert', () => {
    it('should attempt to upsert a resource', async () => {
      // Arrange.
      const target = createTestTarget();
      const dragon = { name: 'dragon' };
      http.set(target.endpoint().build(), ZHttpMethod.Put, new ZHttpResultBuilder(dragon).build());
      // Act.
      const actual = await target.upsert(dragon);
      // Assert.
      expect(actual).toEqual(dragon);
    });
  });

  describe('Update', () => {
    it('should attempt to update a resource', async () => {
      // Arrange.
      const target = createTestTarget();
      http.set(target.endpoint(fire.id).build(), ZHttpMethod.Patch, new ZHttpResultBuilder(fire).build());
      // Act.
      const actual = await target.update(fire.id!, { name: 'fiery' });
      // Assert.
      expect(actual).toEqual(fire);
    });
  });

  describe('Delete', () => {
    it('should attempt to delete a resource', async () => {
      // Arrange.
      const target = createTestTarget();
      const url = target.endpoint(fire.id!).build();
      http.set(url, ZHttpMethod.Delete, new ZHttpResultBuilder(undefined).status(ZHttpCodeSuccess.NoContent).build());
      const expected = new ZHttpRequestBuilder().url(url).delete().build();
      vi.spyOn(http, 'request');
      // Act.
      await target.delete(fire.id!);
      // Assert.
      expect(http.request).toHaveBeenCalledWith(expected);
    });
  });
});
