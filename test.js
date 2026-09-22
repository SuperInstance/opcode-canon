// node --test test.js — assertions, not just logging.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  ALL_OPCODES, BASE_OPCODES, PROPOSED_OPCODES, count,
  OPCODE_SIGNATURES, isBase, isProposed,
} = require('./index.js');

test('11 opcodes total: 5 base + 6 proposed', () => {
  assert.equal(count(), 11);
  assert.equal(BASE_OPCODES.length, 5);
  assert.equal(PROPOSED_OPCODES.length, 6);
  assert.deepEqual(ALL_OPCODES, [...BASE_OPCODES, ...PROPOSED_OPCODES]);
});

test('canonical spelling is MERGE everywhere', () => {
  assert.ok(PROPOSED_OPCODES.includes('MERGE'));
  assert.ok(!PROPOSED_OPCODES.includes('MERGER'), 'MERGER is the drifted misspelling');
  assert.ok(OPCODE_SIGNATURES.MERGE, 'MERGE signature must exist');
  assert.equal(OPCODE_SIGNATURES.MERGER, undefined, 'no MERGER key may survive');
});

test('every opcode has a signature with in/out/is_mutating', () => {
  for (const op of ALL_OPCODES) {
    const sig = OPCODE_SIGNATURES[op];
    assert.ok(sig, `missing signature for ${op}`);
    assert.ok(Array.isArray(sig.in));
    assert.ok(Array.isArray(sig.out));
    assert.equal(typeof sig.is_mutating, 'boolean');
  }
});

test('REVOKE is authority-without-erasure: mutating, produces a scar', () => {
  const sig = OPCODE_SIGNATURES.REVOKE;
  assert.equal(sig.is_mutating, true);
  assert.ok(sig.out.includes('revocation-scar'));
});

test('VIEW is the only non-mutating base opcode', () => {
  const mutating = BASE_OPCODES.filter((op) => OPCODE_SIGNATURES[op].is_mutating);
  assert.equal(mutating.length, 4);
  assert.equal(OPCODE_SIGNATURES.VIEW.is_mutating, false);
});

test('classification helpers agree with the arrays', () => {
  assert.ok(isBase('BIND'));
  assert.ok(!isBase('REVOKE'));
  assert.ok(isProposed('WITHDRAW'));
  assert.ok(!isProposed('TICK'));
});
