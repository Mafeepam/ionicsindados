const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  getNativeIonicConfig,
} = require('../.native-tests/src/app/native-config.js');
const {
  default: capacitorConfig,
} = require('../.native-tests/capacitor.config.js');

test('iOS uses Apple components and back gestures without Material ripple effects', () => {
  const config = getNativeIonicConfig('ios');
  assert.equal(config.mode, 'ios');
  assert.equal(config.swipeBackEnabled, true);
  assert.equal(config.rippleEffect, false);
  assert.equal(config.backButtonText, 'Voltar');
});

test('Android uses Material components and hardware back handling', () => {
  const config = getNativeIonicConfig('android');
  assert.equal(config.mode, 'md');
  assert.equal(config.swipeBackEnabled, false);
  assert.equal(config.rippleEffect, true);
  assert.equal(config.hardwareBackButton, true);
});

test('web and unknown platforms use the detected browser mode', () => {
  for (const platform of ['web', '', 'unknown']) {
    assert.equal(getNativeIonicConfig(platform, '', 'md').mode, 'md');
    assert.equal(getNativeIonicConfig(platform, '', 'ios').mode, 'ios');
  }
});

test('the iOS query configures both component appearance and behavior on the web', () => {
  const config = getNativeIonicConfig('web', '?ionic:mode=ios', 'md');
  assert.equal(config.mode, 'ios');
  assert.equal(config.swipeBackEnabled, true);
  assert.equal(config.rippleEffect, false);
  assert.equal(config.backButtonText, 'Voltar');
});

test('the Material query overrides an iOS browser without enabling native APIs', () => {
  const config = getNativeIonicConfig('web', '?ionic:mode=md', 'ios');
  assert.equal(config.mode, 'md');
  assert.equal(config.swipeBackEnabled, false);
  assert.equal(config.rippleEffect, true);
  assert.equal(config.hardwareBackButton, undefined);
});

test('query mode overrides native appearance while retaining Android back support', () => {
  const androidConfig = getNativeIonicConfig('android', '?ionic:mode=ios');
  assert.equal(androidConfig.mode, 'ios');
  assert.equal(androidConfig.swipeBackEnabled, true);
  assert.equal(androidConfig.rippleEffect, false);
  assert.equal(androidConfig.hardwareBackButton, true);

  const iosConfig = getNativeIonicConfig('ios', '?ionic:mode=md');
  assert.equal(iosConfig.mode, 'md');
  assert.equal(iosConfig.swipeBackEnabled, false);
  assert.equal(iosConfig.rippleEffect, true);
});

test('native platform defaults take precedence over browser detection', () => {
  assert.equal(getNativeIonicConfig('ios', '', 'md').mode, 'ios');
  assert.equal(getNativeIonicConfig('android', '', 'ios').mode, 'md');
});

test('invalid and empty query modes fall back to valid platform or browser modes', () => {
  for (const search of [
    '?ionic:mode=',
    '?ionic:mode=android',
    '?ionic:mode=IOS',
    '?ionic:mode=invalid',
    '?ionic:mode=%3Cscript%3E',
    '?ionic:mode=%ZZ',
  ]) {
    assert.equal(getNativeIonicConfig('ios', search).mode, 'ios');
    assert.equal(getNativeIonicConfig('android', search).mode, 'md');
    assert.equal(getNativeIonicConfig('web', search, 'ios').mode, 'ios');
    assert.equal(getNativeIonicConfig('web', search, 'md').mode, 'md');
  }
});

test('encoded query keys are accepted alongside unrelated parameters', () => {
  assert.equal(
    getNativeIonicConfig('web', '?source=demo&ionic%3Amode=ios').mode,
    'ios',
  );
});

test('native packages embed Angular browser output without a remote development server', () => {
  const angularConfig = require('../angular.json');
  const outputPath =
    angularConfig.projects['sindados-app'].architect.build.options.outputPath;
  assert.equal(capacitorConfig.webDir, `${outputPath}/browser`);
  assert.equal(capacitorConfig.server, undefined);
  assert.equal(capacitorConfig.appId, 'br.org.sindados.app');
});
