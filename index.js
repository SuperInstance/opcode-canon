// opcode-canon: the 11 typed substrate opcodes.
// Canonical reference for what each opcode does, what its inputs and outputs are,
// and how multiple opcodes compose.

// The 5 base opcodes (proven in C99 algebra):
// BIND:    create or update a cell (atomic creation)
// LINK:    connect two cells (typed edges)
// EFFECT:  invoke cell behavior (compute, transform)
// VIEW:    read cell state (introspect, no mutation)
// TICK:    advance the substrate clock (one time-step)

// The 6 proposed opcodes (R10 canon):
// ATTEST:    add trust score to an observation
// DELEGATE:  grant a capability to another node
// CONTEST:   create counter-observation
// MERGE:     reach consensus across contradictions
// REVOKE:    mark observation as superseded (scar)
// WITHDRAW:  pull observation into private scope

const BASE_OPCODES = ['BIND', 'LINK', 'EFFECT', 'VIEW', 'TICK'];
// Canonical spelling is MERGE (package description + header comment agreed);
// code previously drifted to MERGER in this array and in OPCODE_SIGNATURES.
const PROPOSED_OPCODES = ['ATTEST', 'DELEGATE', 'CONTEST', 'MERGE', 'REVOKE', 'WITHDRAW'];
const ALL_OPCODES = [...BASE_OPCODES, ...PROPOSED_OPCODES];

const OPCODE_SIGNATURES = {
  // Base
  BIND: { in: ['cell-template'], out: ['cell'], is_mutating: true },
  LINK: { in: ['cell-a', 'cell-b', 'edge-type'], out: ['edge'], is_mutating: true },
  EFFECT: { in: ['cell', 'args'], out: ['result'], is_mutating: true },
  VIEW: { in: ['cell'], out: ['projection'], is_mutating: false },
  TICK: { in: [], out: ['tick-event'], is_mutating: true },
  // Proposed
  ATTEST: { in: ['observation', 'attestor', 'trust'], out: ['attestation'], is_mutating: true },
  DELEGATE: { in: ['from', 'to', 'capabilities'], out: ['delegation-receipt'], is_mutating: true },
  CONTEST: { in: ['observation', 'contestor', 'evidence'], out: ['counter-observation'], is_mutating: true },
  MERGE: { in: ['observations[]', 'merger'], out: ['merged-observation'], is_mutating: true },
  REVOKE: { in: ['observation', 'revoker', 'reason'], out: ['revocation-scar'], is_mutating: true },
  WITHDRAW: { in: ['observation', 'withdrawer', 'reason'], out: ['withdrawal-scar'], is_mutating: true },
};

module.exports = {
  BASE_OPCODES,
  PROPOSED_OPCODES,
  ALL_OPCODES,
  OPCODE_SIGNATURES,
  isBase: (op) => BASE_OPCODES.includes(op),
  isProposed: (op) => PROPOSED_OPCODES.includes(op),
  count: () => ALL_OPCODES.length,
};
