const assert = require('node:assert/strict');
const { test } = require('node:test');

require('@angular/compiler');
const { Injector, runInInjectionContext } = require('@angular/core');
const {
  DefaultUrlSerializer,
  RedirectCommand,
  Router,
} = require('@angular/router');
const { authGuard } = require('../.native-tests/src/app/guards/auth.guard.js');
const {
  DadosService,
} = require('../.native-tests/src/app/services/dados.service.js');

function checkAccess(url, authenticated = false) {
  const serializer = new DefaultUrlSerializer();
  const router = {
    url: '/',
    parseUrl: (value) => serializer.parse(value),
    createUrlTree: (commands, options) => {
      const tree = serializer.parse(commands.join('/'));
      tree.queryParams = options.queryParams;
      return tree;
    },
  };
  const injector = Injector.create({
    providers: [
      { provide: Router, useValue: router },
      { provide: DadosService, useValue: { isAutenticado: authenticated } },
    ],
  });

  try {
    return runInInjectionContext(injector, () => authGuard({}, { url }));
  } finally {
    injector.destroy();
  }
}

test('initial protected links retain the requested appearance when redirected to login', () => {
  const serializer = new DefaultUrlSerializer();
  for (const mode of ['ios', 'md']) {
    const result = checkAccess(
      `/tabs/acordos?ionic%3Amode=${mode}&source=preview`,
    );
    assert.ok(result instanceof RedirectCommand);
    assert.equal(
      serializer.serialize(result.redirectTo).split('?')[0],
      '/login',
    );
    assert.deepEqual(result.redirectTo.queryParams, {
      'ionic:mode': mode,
      source: 'preview',
    });
    assert.equal(result.navigationBehaviorOptions.replaceUrl, true);
  }
});

test('appearance and authentication-like query values do not grant access', () => {
  const result = checkAccess('/tabs/home?ionic:mode=ios&isAutenticado=true');
  assert.ok(result instanceof RedirectCommand);
});

test('an authenticated session can access either appearance', () => {
  for (const mode of ['ios', 'md']) {
    assert.equal(checkAccess(`/tabs/home?ionic:mode=${mode}`, true), true);
  }
});
