const {
    createTransaction,
    signTransaction
} = require('./createTx.js')
const Web3 = require("web3");

/*
This script is used for test on localhost:7545 as defalut, you can change it easily.
Entry:
    argv[2] : address of sender
    argv[3] : address of receiver
    argv[4] : private key of sender
*/

var url = "http://localhost:7545";
var fromAddress = process.argv[2];
var toAddress = process.argv[3];
var privateKey = process.argv[4];

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(url));
}

const sendTransaction = async function () {
    var nonce = await web3.eth.getTransactionCount(fromAddress)

    /*Create your data. The structure of data:
        8 hex characters : hash of function prototype (use sha3 Alg)
        64 hex characters: hex string of the first parameter for function
        similar for the second, third, .. parameters of function

        data = 8hex64hex64hex.. (continuous components)
    */
    
    var data = "";
    var value = 0;
    var tx = createTransaction(toAddress, nonce, 0x09184e72a000, 0x27100, value, data)
    if (tx == "") {
        console.log("Error");
        return;
    }

    signTransaction(privateKey)
    web3.eth.sendSignedTransaction(serializedTx, (error, hash) => {
        if (error) {
            console.log("Error ", error);
        }
        else {
            console.log(hash);
        }
    })
}

sendTransaction();


