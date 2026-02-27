const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

test('eslint is installed at v8', () => {
  const pkg = require('eslint/package.json');
  assert(pkg.version.startsWith('9.'));
});

test('.eslintrc.json exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', '.eslintrc.json')));
});

test('config is valid JSON', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config);
});

test('config has root: true', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config.root === true);
});

test('config has env settings', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config.env.node === true);
  assert(config.env.es2022 === true);
  assert(config.env.jest === true);
});

test('config has complex rules', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config.rules['no-unused-vars']);
  assert(config.rules['prefer-template']);
  assert(config.rules['object-shorthand']);
  assert(config.rules['arrow-body-style']);
});

test('config has overrides', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(Array.isArray(config.overrides));
  assert(config.overrides.length >= 2);
});

test('config has ignorePatterns', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(Array.isArray(config.ignorePatterns));
});

test('app module loads', () => {
  const { createApp } = require('../src/app');
  assert(typeof createApp === 'function');
});

test('router module loads', () => {
  const { Router } = require('../src/router');
  assert(typeof Router === 'function');
  const r = new Router();
  assert(typeof r.get === 'function');
  assert(typeof r.handle === 'function');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
