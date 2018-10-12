


const Web3 = require("web3");
const ethTx = require('ethereumjs-tx');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

var toAddress = ''
// use string hex

// getTransactionCount(fromAddress);
const main = async function () {
    var nonce = await web3.eth.getTransactionCount('0xFD3dBB9cCe8510E50C688e3CF2A3e947cf48e981')

    let selector = web3.utils.sha3('transfer(address,uint256)').substr(2,8)
    let address = 'c0De8a3c0061451F3f7C8bc1DeFE1F0f57Fd276D'.padStart(64, '0')
    let value = web3.utils.toHex(1).substr(2,).padStart(64, '0');
    console.log(value);

    var txParams = {
        nonce: nonce,
        gasPrice: '0x09184e72a000',
        gasLimit: '0x27100',
        to: '0xb12a2390a637d4a8f7dd8d7c4c9c1a5f691ab8c6',
        value: '0x00',
        data: '0x' + selector + address + value
    }
    tx = new ethTx(txParams);
    tx.sign(Buffer.from('2fb53fa8abc3e18e56ecbef1608155153d646b3c0df41e5350f3a11d1ade0e32', 'hex'));
    var serializedTx = '0x' + tx.serialize().toString('hex');

    web3.eth.sendSignedTransaction(serializedTx, (error, hash) => {
        if (error) {
            console.log("Error ", error);
        }
        else {
            console.log(hash);
        }
    })
}

main();


