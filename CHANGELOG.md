# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.0](https://github.com/zthun/webigail/compare/v2.2.0...v2.3.0) (2024-02-10)


### Features

* add first class support for sort and filter parameters ([3f517d1](https://github.com/zthun/webigail/commit/3f517d1c24bb266592ef89a5b57ddd3bda75581d))
* the count and retrieve methods now support the filter and sort request fields ([7ca17b7](https://github.com/zthun/webigail/commit/7ca17b778c6ac879d4b030025e067b0aa1ad0919))



## [2.2.0](https://github.com/zthun/webigail/compare/v2.1.1...v2.2.0) (2024-02-07)


### Features

* result builder can now accept undefined for headers ([945db96](https://github.com/zthun/webigail/commit/945db9692f27eed891b9d7e5f463a639b535a543))



## [2.1.1](https://github.com/zthun/webigail/compare/v2.1.0...v2.1.1) (2024-02-03)

**Note:** Version bump only for package @zthun/webigail





## [2.1.0](https://github.com/zthun/webigail/compare/v2.0.2...v2.1.0) (2024-02-02)


### Features

* webigail-rest constructs a standard service for zthunworks standard rest requests ([484d350](https://github.com/zthun/webigail/commit/484d35008c452ed5697d63dce84f910a7b062e69))


### Bug Fixes

* param documentation on search is now correct ([a465834](https://github.com/zthun/webigail/commit/a46583478ff06b3f9cf2c44667a3f7ef19e198ad))



## [2.0.2](https://github.com/zthun/webigail/compare/v2.0.1...v2.0.2) (2023-12-19)


### Bug Fixes

* migrate lodash to lodash-es ([40fdc83](https://github.com/zthun/webigail/commit/40fdc83f1f3d9605fad6c3e3326b2efdf07d9bb0))



## [2.0.1](https://github.com/zthun/webigail/compare/v2.0.0...v2.0.1) (2023-12-19)


### Bug Fixes

* export routes ([a621d65](https://github.com/zthun/webigail/commit/a621d6572ddd5075fcc7cf4857d930d196fdbac5))
* now correctly marked as module ([dd6defa](https://github.com/zthun/webigail/commit/dd6defabc1a3e0ce2af83a74c7fc4b46c3232ec8))



## [2.0.0](https://github.com/zthun/webigail/compare/v1.2.0...v2.0.0) (2023-12-19)


### ⚠ BREAKING CHANGES

* converted to esm build
* convert to module project
* upgrade nest requirement to latest

### Features

* converted to esm build ([6820c37](https://github.com/zthun/webigail/commit/6820c37f41210cebb89ad86387ab0ad2aba2727a))
* support for youtube urls are now first class ([f395303](https://github.com/zthun/webigail/commit/f395303e9bd06d635632ea447ce8d486dcc6bdd8))
* upgrade nest requirement to latest ([7c93b6f](https://github.com/zthun/webigail/commit/7c93b6faa5f99876c5755e596fb0cc8655be34cb))


### Code Refactoring

* convert to module project ([63f0f7e](https://github.com/zthun/webigail/commit/63f0f7e382a3479241ddc17093dc2c568739e6a1))



## [1.2.0](https://github.com/zthun/webigail/compare/v1.1.0...v1.2.0) (2023-11-27)


### Features

* update to axios 1.6.2 ([1fda3aa](https://github.com/zthun/webigail/commit/1fda3aaf5daa44b6af40c299b1563e7b6d22e0d4))
* webigail-web showcases the webigail documentation ([b22f986](https://github.com/zthun/webigail/commit/b22f9866b5c02c45a937df6956290035e0a2ab42))



## [1.1.0](https://github.com/zthun/webigail/compare/v1.0.2...v1.1.0) (2023-08-19)


### Features

* support for singular query params ([b975bd8](https://github.com/zthun/webigail/commit/b975bd831888bf42fdc0ad880d72af217a908d3b))



## [1.0.2](https://github.com/zthun/webigail/compare/v1.0.1...v1.0.2) (2023-08-16)

**Note:** Version bump only for package @zthun/webigail





## [1.0.1](https://github.com/zthun/webigail/compare/v0.2.0...v1.0.1) (2023-08-16)

**Note:** Version bump only for package @zthun/webigail





## [0.2.0](https://github.com/zthun/webigail/compare/v0.1.0...v0.2.0) (2023-08-15)


### ⚠ BREAKING CHANGES

* location no longer defaults to support node applications

### Features

* location no longer defaults to support node applications ([78de5f5](https://github.com/zthun/webigail/commit/78de5f5917b77484e01d7ad5c7dc3c6016a50e86))
* nestjs module to inject the http service ([1540301](https://github.com/zthun/webigail/commit/15403017fee7c8542c175aebd561ba261a9cde46))
* upgrade axios ([31b8086](https://github.com/zthun/webigail/commit/31b808675904c9f926d7cd73c7d82fe0d37a9b90))



## 0.1.0 (2023-02-26)


### Features

* build up a declarative request ([4f29b15](https://github.com/zthun/webigail/commit/4f29b15805fc1a3b4abbbfa41fd0bb78b94333e9))
* common mime types describe what is in a data url ([f53d68a](https://github.com/zthun/webigail/commit/f53d68aa5c35109340119beee7c7035b3a8a54d5))
* parse a data url to retrieve url binary contents ([2283732](https://github.com/zthun/webigail/commit/2283732d54e99ded36254e367f908e8b3f73e5c6))
* parse a url to retrieve domain, path, and other information from it ([9096891](https://github.com/zthun/webigail/commit/909689129bbc7a47c593b7b01548039657ff4cd8))
* status codes with names and descriptions can be used to validate responses ([0a2a9c8](https://github.com/zthun/webigail/commit/0a2a9c8f2ed96149f046f454a74ab7ec4357255c))
* the mock service is useful for testing ([560548b](https://github.com/zthun/webigail/commit/560548b5a434d054f23c0de5225dd3dd8af6381a))
* the standard http service invokes an endpoint and returns the result ([7bd0356](https://github.com/zthun/webigail/commit/7bd0356e4886bee502b9ffbbd96574a98e9d00d4))
