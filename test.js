const { ALL_OPCODES, BASE_OPCODES, PROPOSED_OPCODES, count, OPCODE_SIGNATURES } = require('./index.js');
console.log('count:', count());
console.log('all:', ALL_OPCODES);
console.log('BASE:', BASE_OPCODES);
console.log('PROPOSED:', PROPOSED_OPCODES);
console.log('BIND sig:', OPCODE_SIGNATURES.BIND);
console.log('WITHDRAW sig:', OPCODE_SIGNATURES.WITHDRAW);
