const ethTx = require('ethereumjs-tx');

function createTransaction(
        toAddress, 
        _nonce = -1,
        _gasPrice = 0x09184e72a000,
        _gasLimit = 0x27100, 
        _value = 0,
        _data = "")
    {
    /*
    _nonce: number 
    _gasLimit: number
    _gasPrice: number
    _value: number
    _data: hex string ex: '0x12345678'

    return transaction object
     */

    if (_nonce == -1) {
        return "";
    }

    var txParams = {
        nonce: '0x' + nonce.toString(16),
        gasPrice: '0x' + _gasLimit.toString(16),
        gasLimit: '0x' + _gasPrice.toString(16),
        to: toAddress,
        value: '0x' + _value.toString,
        data: _data
    }
    try {
        var tx = new ethTx(txParams);
        return tx;
    } catch (err) {
        console.log("Error during create new transaction: ", err);
        return "";
    }
}

function signTransaction(privateKey, tx) {
    /*
    privateKey: string
    return hex string of signed transaction
    */

    var privateKey = Buffer.from(privateKey, 'hex');
    try {
        tx.sign(privateKey);
        return '0x' + tx.serialize().toString('hex');
    } catch (err) {
        console.log("Error during sign transaction: ", err);
        return ""
    }
}

module.exports = {
    createTransaction,
    signTransaction
}
