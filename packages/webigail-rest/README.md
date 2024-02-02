# Webigail REST

Contains services and classes that help with querying REST services based on specific standards.

## Build Status

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/zthun/webigail/tree/latest.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/zthun/webigail/tree/latest)

## Usage

Webigail is built in TypeScript and it exports both ESM and CJS modules.

```sh
# NPM
npm install @zthun/webigail-rest
# Yarn
yarn add @zthun/webigail-rest
```

```ts
import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { ZHttpService } from '@zthun/webigail-http';
import { ZRestfulService } from '@zthun/webigail-rest';

const endpoint = 'https://pokeapi.co/api/v2/pokemon-species';
const service = new ZRestfulService(new ZHttpService(), endpoint);

// Note that the following 2 requests have the expectation that the result for the
// API is in the form of { count, data } or { count, result };
// Counts the resources that match the request - uses GET verb
service.count(new ZDataRequestBuilder().search('bulbasaur').build()).then((count) => console.log(count));
// Get a page of resources - uses GET verb
service.request(new ZDataRequestBuilder().page(1).size(50).build()).then((page) => console.log(page));

// Get a single resource - uses GET verb
service.get('ditto').then((ditto) => console.log(ditto));

// Note:  The pokemon API is read only, but these would still invoke the endpoint with the given verbs
// The would just fail with 404s, but these are here to illustrate the usage of a full rest service.
// There is also an assumption that the return values on the services return the data that was mutated.
// Delete is assumed to return a 204 - No Content if successful.

// Create a new resource - uses POST verb
service.create({ name: 'not-really-a-pokemon' }).then((created) => console.log(created));
// Upsert a resource - Creates if not exists, updates if exists - uses PUT verb
service.upsert({ id: 'missing-no', name: 'MissingNo' }).then((upserted) => console.log(upserted));
// Updates a resource - uses PATCH verb
service.update('pikachu', { name: 'Pika-who?' }).then((updated) => console.log(updated));
// Deletes a resource - uses DELETE verb
service.delete('pikachu').then(() => console.log('Pikachu has fainted from existence'));
```
