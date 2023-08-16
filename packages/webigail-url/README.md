# Webigail URL

It's easy to make mistakes when making REST invocations and public API calls. Webigail solves this by using the builder
pattern to construct a full URL given different parts of a URI.

## Build Status

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/zthun/webigail/tree/latest.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/zthun/webigail/tree/latest)

## Usage

Webigail is built in TypeScript and it exports both ESM and CJS modules.

```sh
# NPM
npm install @zthun/webigail-url
# Yarn
yarn add @zthun/webigail-url
```

```ts
import { ZUrlBuilder } from '@zthun/webigail-url';

const url = new ZUrlBuilder().protocol('https').hostname('zthunworks.com').subdomain('webigail').build();

// Outputs https://webigail.zthunworks.com
console.log(url);
```

There are also some utility functions for common use cases.

```ts
import { ZUrlBuilder } from '@zthun/webigail-url';

// Note: Browser only unless you're using jsdom in node.  Outputs the current
// browser location with /api appended to it.
const locationUrl = new ZUrlBuilder().location(location).path('/api').build();
console.log(url);

// Url for a persons gravatar if one exists.
const avatar = new ZUrlBuilder().gravatar(md5('john-doe@gmail.com'), 256).build();
console.log(avatar);

// Outputs the existing pieces of the url.
const existingInfo = new ZUrlBuilder().parse('https://webigail.zthunworks.com/api/path?filter=hello').info();
console.log(existingInfo);
```

## Data URLs

Webigail also supports building and parsing data urls as well.

```ts
import { ZDataUrlBuilder, ZMimeTypeApplication } from '@zthun/webigail-url';

const raw = require('my-data.json');
const mimeType = ZMimeTypeApplication.JSON;
const url = new ZDataUrlBuilder().mimeType(mimeType).buffer(Buffer.from(raw)).encode('base64').build();
console.log(url);
```
