# Description

Webigail deals with internet things. Whenever you are building REST services or
invoking REST endpoints, you will most likely deal with the need for HTTP
requests, URLs, and frameworks that handle these concepts. The Webigail packages
deal with these issues in more elegant ways than writing
[WET](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) code.

## Packages

| Name                                                       | For                                                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [@zthun/webigail-http](./packages/webigail-http/README.md) | Making HTTP requests with dependency injection and mock services for testing. |
| [@zthun/webigail-nest](./packages/webigail-nest/README.md) | Integrating Webigail HTTP services into NestJS applications.                  |
| [@zthun/webigail-rest](./packages/webigail-rest/README.md) | Querying and managing resources through REST services.                        |
| [@zthun/webigail-url](./packages/webigail-url/README.md)   | Building and parsing URLs, including data URLs.                               |

## Build Status

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/zthun/webigail/tree/latest.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/zthun/webigail/tree/latest)
