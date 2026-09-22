// Type declarations for @superinstance/opcode-canon.
// The canonical spelling of the consensus opcode is MERGE (not MERGER).
export const BASE_OPCODES: readonly ['BIND', 'LINK', 'EFFECT', 'VIEW', 'TICK'];
export const PROPOSED_OPCODES: readonly ['ATTEST', 'DELEGATE', 'CONTEST', 'MERGE', 'REVOKE', 'WITHDRAW'];
export const ALL_OPCODES: readonly string[];

export interface OpcodeSignature {
  in: string[];
  out: string[];
  is_mutating: boolean;
}

export const OPCODE_SIGNATURES: Readonly<Record<string, OpcodeSignature>>;

export function isBase(op: string): boolean;
export function isProposed(op: string): boolean;
export function count(): number;
