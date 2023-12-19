import { find } from 'lodash';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IZUrlInfo, ZUrlBuilder, ZYouTubeApi } from './url.mjs';

describe('ZUrlBuilder', () => {
  let protocol: string;
  let hostname: string;

  beforeEach(() => {
    protocol = 'https';
    hostname = 'facebook.com';
  });

  function createTestTarget() {
    return new ZUrlBuilder(protocol, hostname);
  }

  describe('Parts', () => {
    it('defaults the protocol and hostname.', () => {
      const expected = 'http://localhost';
      expect(new ZUrlBuilder().build()).toEqual(expected);
    });

    it('cleans the protocol.', () => {
      const expected = `${protocol}://${hostname}`;
      expect(createTestTarget().protocol(`${protocol}://`).build()).toEqual(expected);
    });

    it('sets the correct host.', () => {
      const expected = `${protocol}://www.yahoo.com`;
      expect(createTestTarget().hostname('www.yahoo.com').build()).toEqual(expected);
    });

    it('cleans the host.', () => {
      const expected = `${protocol}://${hostname}`;
      expect(createTestTarget().hostname(`////////${hostname}////`).build()).toEqual(expected);
    });

    it('sets the correct path.', () => {
      const expected = `${protocol}://${hostname}/a/b/c/d`;
      expect(createTestTarget().append('a/b').append('/c/d/').build()).toEqual(expected);
    });

    it('cleans the path.', () => {
      const expected = `${protocol}://${hostname}/a/b/c/d`;
      expect(createTestTarget().append('////a/b/////').append('c').append('/d///').build()).toEqual(expected);
    });

    it('sets the hash.', () => {
      const expected = `${protocol}://${hostname}/a/b#abcd`;
      expect(createTestTarget().append('/a/b').hash('abcd').build()).toEqual(expected);
    });

    it('sets the port.', () => {
      const expected = `${protocol}://${hostname}:8080`;
      expect(createTestTarget().port(8080).build()).toEqual(expected);
    });

    it('ignores port 0.', () => {
      const expected = `http://${hostname}`;
      expect(createTestTarget().protocol('http').port(0).build()).toEqual(expected);
    });

    it('ignores default ports.', () => {
      const expected = `http://${hostname}`;
      expect(createTestTarget().protocol('http').port(80).build()).toEqual(expected);
    });

    it('adds the search.', () => {
      const expected = `${protocol}://${hostname}/?paramA=a&paramB=b`;
      expect(createTestTarget().param('paramA', 'a').param('paramB', 'b').build()).toEqual(expected);
    });

    it('adds a subdomain.', () => {
      const expected = `${protocol}://mail.${hostname}`;
      expect(createTestTarget().subdomain('mail').build()).toEqual(expected);
    });

    it('replaces a subdomain.', () => {
      const expected = `${protocol}://mail.${hostname}`;
      expect(createTestTarget().subdomain('email').popSubdomain().subdomain('mail').build()).toEqual(expected);
    });

    it('sets the domain as the host if the host is not set.', () => {
      const expected = `${protocol}://mail`;
      expect(createTestTarget().hostname('').subdomain('mail').build()).toEqual(expected);
    });

    it('encodes the parameter values.', () => {
      const valA = 'ab&cd&e//fg';
      const expected = `${protocol}://${hostname}/?paramA=${encodeURIComponent(valA)}`;
      expect(createTestTarget().param('paramA', valA).build()).toEqual(expected);
    });

    it('sets the user.', () => {
      const expected = `${protocol}://user@${hostname}`;
      expect(createTestTarget().username('user').build()).toEqual(expected);
    });

    it('sets the password.', () => {
      const expected = `${protocol}://user:password@${hostname}`;
      expect(createTestTarget().username('user').password('password').build()).toEqual(expected);
    });

    it('ignores the password if the user is not set.', () => {
      const expected = `${protocol}://${hostname}`;
      expect(createTestTarget().password('password').build()).toEqual(expected);
    });
  });

  describe('Parsing', () => {
    it('correctly parses a url.', () => {
      const expected = 'https://user:password@www.google.com:9086/foo/bar/?valA=a&valB=b#hhh';
      expect(createTestTarget().parse(expected).build()).toEqual(expected);
    });

    it('supports partial uri values.', () => {
      // Arrange
      const expected = '/foo/bar/?valA=a&valB=b#hhh';
      const target = createTestTarget();
      // Act
      const actual = target.parse(expected).build();
      // Assert
      expect(actual.endsWith(expected)).toBeTruthy();
    });

    it('can be modified.', () => {
      const url = 'https://google.com:9086/foo/bar#hhh';
      const expected = 'http://user:password@mail.google.com:9099/a/b/c/?valA=c&valB=d#h32';
      expect(
        createTestTarget()
          .parse(url)
          .protocol('http')
          .port(9099)
          .path('a')
          .append('b/c')
          .param('valA', 'c')
          .param('valB', 'd')
          .hash('h32')
          .username('user')
          .password('password')
          .subdomain('mail')
          .build()
      ).toEqual(expected);
    });

    it('can be modified to use a different port.', () => {
      const url = 'https://www.google.com';
      const expected = 'https://www.google.com:9999';
      expect(createTestTarget().parse(url).port(9999).build()).toEqual(expected);
    });
  });

  describe('Location', () => {
    let loc: Location;

    beforeEach(() => {
      loc = {
        ancestorOrigins: {} as unknown as DOMStringList,
        hash: '',
        host: '',
        hostname,
        href: '',
        origin: '',
        pathname: '',
        port: '',
        protocol,
        search: '',
        assign: vi.fn(),
        reload: vi.fn(),
        replace: vi.fn()
      };
    });

    it('it constructs the search params.', () => {
      // Arrange
      const target = createTestTarget();
      loc.search = '?a=b';
      // Act
      const actual = target.location(loc).build();
      // Assert
      expect(actual.endsWith('a=b')).toBeTruthy();
    });

    describe('API', () => {
      it('initializes with the default parameters.', () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = target.api(loc).build();
        // Assert
        expect(actual).toBeTruthy();
      });

      it('replaces the path with the basePath', () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = target.api(loc, 'api').build();
        // Assert
        expect(actual.endsWith('api')).toBeTruthy();
      });
    });
  });

  describe('Gravatar', () => {
    it('returns the base gravatar url.', () => {
      expect(createTestTarget().gravatar().build()).toEqual(ZUrlBuilder.UrlGravatar);
    });

    it('adds the hashed email and size.', () => {
      const hash = 'd41d8cd98f00b204e9800998ecf8427e';
      const size = 256;
      const expected = createTestTarget().parse(ZUrlBuilder.UrlGravatar).append(hash).param('s', `${size}`).build();
      expect(createTestTarget().gravatar(hash, size).build()).toEqual(expected);
    });
  });

  describe('YouTube', () => {
    it('returns the base YouTube url.', () => {
      expect(createTestTarget().youTube().build()).toEqual(ZUrlBuilder.UrlYouTube);
    });

    it('returns an watch video url for YouTube.', () => {
      const id = 'kVsR01vPiP4';
      const expected = createTestTarget().parse(ZUrlBuilder.UrlYouTube).append('watch').param('v', id).build();
      expect(createTestTarget().youTube(ZYouTubeApi.Watch, id).build()).toEqual(expected);
    });

    it('returns an embed video url for YouTube.', () => {
      const id = 'kVsR01vPiP4';
      const expected = createTestTarget().parse(ZUrlBuilder.UrlYouTube).append('embed').append(id).build();
      expect(createTestTarget().youTube(ZYouTubeApi.Embed, id).build()).toEqual(expected);
    });
  });

  describe('Query', () => {
    const shouldAddParam = (expected: string, key: string, setFn: (t: ZUrlBuilder) => ZUrlBuilder) => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const { params } = setFn(target).info();
      const { val } = find(params, (p) => p.key === key)!;
      // Assert
      expect(val).toEqual(expected);
    };

    const shouldAddOnlyOnce = (expected: string, key: string, setFn: (t: ZUrlBuilder) => ZUrlBuilder) => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const { params } = setFn(setFn(target)).info();
      const actual = params.filter((p) => p.key === key);
      // Assert
      expect(actual.length).toEqual(1);
    };

    const shouldDeleteParam = (key: string, setFn: (t: ZUrlBuilder) => ZUrlBuilder) => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const { params } = setFn(target).info();
      const actual = params.filter((p) => p.key === key);
      // Assert
      expect(actual.length).toEqual(0);
    };

    describe('Page', () => {
      it('should add the param', () => {
        shouldAddParam('4', 'page', (t) => t.page(4));
      });

      it('should only add the param once', () => {
        shouldAddOnlyOnce('3', 'page', (t) => t.page(3));
      });

      it('should delete the param', () => {
        shouldDeleteParam('page', (t) => t.page(3).page());
      });

      it('should delete the param if less than 1', () => {
        shouldDeleteParam('page', (t) => t.page(3).page());
      });

      it('should delete the param if negative', () => {
        shouldDeleteParam('page', (t) => t.page(3).page(-1));
      });
    });

    describe('Size', () => {
      it('should add the param', () => {
        shouldAddParam('150', 'size', (t) => t.size(150));
      });

      it('should add the param if 0', () => {
        shouldAddParam('0', 'size', (t) => t.size(0));
      });

      it('should only add the param once', () => {
        shouldAddOnlyOnce('100', 'size', (t) => t.size(3));
      });

      it('should delete the param', () => {
        shouldDeleteParam('size', (t) => t.size(3).size());
      });

      it('should delete the param if negative', () => {
        shouldDeleteParam('size', (t) => t.size(3).size(-1));
      });
    });

    describe('Search', () => {
      const Text = 'search text';
      it('should add the param', () => {
        shouldAddParam(Text, 'search', (t) => t.search(Text));
      });

      it('should only add the param once', () => {
        shouldAddOnlyOnce(Text, 'search', (t) => t.search(Text));
      });

      it('should delete the param', () => {
        shouldDeleteParam('search', (t) => t.search(Text).search());
      });

      it('should delete the param if empty', () => {
        shouldDeleteParam('search', (t) => t.search(Text).search(''));
      });
    });
  });

  describe('Info', () => {
    it('returns the current url information.', () => {
      // Arrange
      const expected: IZUrlInfo = {
        protocol: 'ftp',
        username: 'user',
        password: 'pass',
        hostname: 'host.com',
        hash: 'hash',
        port: 5001,
        path: ['/', 'foo', 'bar'],
        params: [
          { key: 'filter', val: 'a' },
          { key: 'filter', val: 'b' }
        ]
      };
      const target = createTestTarget()
        .protocol(expected.protocol)
        .username(expected.username)
        .password(expected.password)
        .hostname(expected.hostname)
        .hash(expected.hash)
        .port(expected.port)
        .append('foo')
        .append('bar')
        .param('filter', 'a')
        .param('filter', 'b');
      // Act
      const actual = target.info();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
