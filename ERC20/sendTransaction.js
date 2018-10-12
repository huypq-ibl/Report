const {
    createTransaction,
    signTransaction
} = require('./createTx.js');
const fs = require('fs');
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
var privateKey = process.argv[3];
var fileAddress = process.argv[4];

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(url));
}

const loadAddress = function (fileAddress) {
    let data = fs.readFileSync(fileAddress).toString.split('\n');
    let addresses = [];
    for (let i = 0; i < data.length; i++) {
        addresses.push(JSON.parse(data[i]).address);
    }

    return addresses;
};

const sendTransaction = async function () {
    var addresses = loadAddress(fileAddress);
    var nonce = await web3.eth.getTransactionCount(fromAddress)

    /*Create your data. The structure of data:
        8 hex characters : hash of function prototype (use sha3 Alg)
        64 hex characters: hex string of the first parameter for function
        similar for the second, third, .. parameters of function

        data = 0x8hex64hex64hex.. (continuous components)
    */
    
    var data = "";
    let prefix = web3.utils.sha3('transfer(address[],uint256)').substr(2,8);
    let addressParams = addressed.toString().padStart(64, '0');
    var value = parseInt(process.argv[5]).toString().padStart(64, '0');
    data = '0x' + prefix + addressParams + value;

    var tx = createTransaction(toAddress, nonce, 0x09184e72a000, 0x27100, 0x00, data);
    if (tx == "") {
        console.log("Error");
        return;
    }

    signTransaction(privateKey);
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


