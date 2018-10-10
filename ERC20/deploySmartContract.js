const fs = require('fs');
const Web3 = require('web3');
const solc = require('solc');

// Read file source solidity
const source = fs.readFileSync('./ERC20.sol', 'UTF-8');
// Compile source solidity
const comSol = solc.compile(source, 1).contracts[':ERC20'];
var abi = comSol.interface;
var ERC = new web3.eth.constact(JSON.parse(abi), '0xFD3dBB9cCe8510E50C688e3CF2A3e947cf48e981', 
);
