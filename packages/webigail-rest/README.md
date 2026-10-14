# Webigail REST

This package contains services and classes that help with querying REST services
based on specific standards.

## Build Status

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/zthun/webigail/tree/latest.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/zthun/webigail/tree/latest)

## Usage

Webigail is built in TypeScript and exports both ESM and CJS modules.

```sh
# NPM
npm install @zthun/webigail-rest
# Yarn
yarn add @zthun/webigail-rest
```

```ts
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import { ZHttpService } from "@zthun/webigail-http";
import { ZRestfulService } from "@zthun/webigail-rest";

const endpoint = "https://pokeapi.co/api/v2/pokemon-species";
const service = new ZRestfulService(new ZHttpService(), endpoint);

// Note that the following two requests expect the result from the
// API to be in the form of { count, data } or { count, result }.
// Counts the resources that match the request - uses the GET verb
service
  .count(new ZDataRequestBuilder().search("bulbasaur").build())
  .then((count) => console.log(count));
// Gets a page of resources - uses the GET verb
service
  .request(new ZDataRequestBuilder().page(1).size(50).build())
  .then((page) => console.log(page));

// Gets a single resource - uses the GET verb
service.get("ditto").then((ditto) => console.log(ditto));

// Note: The Pokémon API is read-only, but these calls would still invoke the
// endpoint with the given verbs. They would fail with 404s, but
// they are here to illustrate the usage of a full REST service. These calls
// also assume that the services return the data that was mutated.
// Delete is assumed to return 204 - No Content if successful.

// Creates a new resource - uses the POST verb
service
  .create({ name: "not-really-a-pokemon" })
  .then((created) => console.log(created));
// Upsert a resource - creates it if it doesn't exist, updates it if it does
// Uses the PUT verb
service
  .upsert({ id: "missing-no", name: "MissingNo" })
  .then((upserted) => console.log(upserted));
// Updates a resource - uses the PATCH verb
service
  .update("pikachu", { name: "Pika-who?" })
  .then((updated) => console.log(updated));
// Deletes a resource - uses the DELETE verb
service
  .delete("pikachu")
  .then(() => console.log("Pikachu has fainted from existence"));
```
