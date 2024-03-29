# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.4.0](https://github.com/zthun/webigail/compare/v2.3.0...v2.4.0) (2024-02-13)


### Features

* from content type deconstructs an object base on the content type and body init ([fc08909](https://github.com/zthun/webigail/commit/fc0890920fa41417a1f932493a27f2ed007aea8e))
* http service can now handle binary, text, form, and json data ([8e8b705](https://github.com/zthun/webigail/commit/8e8b705ebbe7c9c9a2957ad6474bf857590a7a4d))
* isBodyInit and toBodyInit enable casting of objects to BodyInit supported shapes ([ded6dfe](https://github.com/zthun/webigail/commit/ded6dfe2aff9e98c09a02db6feb407aea191d637))
* webigail-http now depends on lodash-es ([4261f3b](https://github.com/zthun/webigail/commit/4261f3b685955442a0e5c7b052b1c5616a173fd2))


### Bug Fixes

* request builder now properly duplicates the body without destroying it ([e81ed50](https://github.com/zthun/webigail/commit/e81ed5045339798bdcdaa45c1348f0ffab5a532f))



## [2.3.0](https://github.com/zthun/webigail/compare/v2.2.0...v2.3.0) (2024-02-10)

**Note:** Version bump only for package @zthun/webigail-http





## [2.2.0](https://github.com/zthun/webigail/compare/v2.1.1...v2.2.0) (2024-02-07)


### Features

* result builder can now accept undefined for headers ([945db96](https://github.com/zthun/webigail/commit/945db9692f27eed891b9d7e5f463a639b535a543))



## [2.1.1](https://github.com/zthun/webigail/compare/v2.1.0...v2.1.1) (2024-02-03)

**Note:** Version bump only for package @zthun/webigail-http





## [2.1.0](https://github.com/zthun/webigail/compare/v2.0.2...v2.1.0) (2024-02-02)

**Note:** Version bump only for package @zthun/webigail-http





## [2.0.1](https://github.com/zthun/webigail/compare/v2.0.0...v2.0.1) (2023-12-19)


### Bug Fixes

* export routes ([a621d65](https://github.com/zthun/webigail/commit/a621d6572ddd5075fcc7cf4857d930d196fdbac5))



## [2.0.0](https://github.com/zthun/webigail/compare/v1.2.0...v2.0.0) (2023-12-19)


### ⚠ BREAKING CHANGES

* convert to module project

### Code Refactoring

* convert to module project ([63f0f7e](https://github.com/zthun/webigail/commit/63f0f7e382a3479241ddc17093dc2c568739e6a1))



## [1.2.0](https://github.com/zthun/webigail/compare/v1.1.0...v1.2.0) (2023-11-27)


### Features

* update to axios 1.6.2 ([1fda3aa](https://github.com/zthun/webigail/commit/1fda3aaf5daa44b6af40c299b1563e7b6d22e0d4))



## [1.1.0](https://github.com/zthun/webigail/compare/v1.0.2...v1.1.0) (2023-08-19)

**Note:** Version bump only for package @zthun/webigail-http





## [1.0.2](https://github.com/zthun/webigail/compare/v1.0.1...v1.0.2) (2023-08-16)

**Note:** Version bump only for package @zthun/webigail-http





## [0.2.0](https://github.com/zthun/webigail/compare/v0.1.0...v0.2.0) (2023-08-15)


### Features

* upgrade axios ([31b8086](https://github.com/zthun/webigail/commit/31b808675904c9f926d7cd73c7d82fe0d37a9b90))



## 0.1.0 (2023-02-26)


### Features

* build up a declarative request ([4f29b15](https://github.com/zthun/webigail/commit/4f29b15805fc1a3b4abbbfa41fd0bb78b94333e9))
* status codes with names and descriptions can be used to validate responses ([0a2a9c8](https://github.com/zthun/webigail/commit/0a2a9c8f2ed96149f046f454a74ab7ec4357255c))
* the mock service is useful for testing ([560548b](https://github.com/zthun/webigail/commit/560548b5a434d054f23c0de5225dd3dd8af6381a))
* the standard http service invokes an endpoint and returns the result ([7bd0356](https://github.com/zthun/webigail/commit/7bd0356e4886bee502b9ffbbd96574a98e9d00d4))
