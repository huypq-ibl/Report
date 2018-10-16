const {
    createTransaction,
    signTransaction
} = require('./createTx.js');
const fs = require('fs');
const Web3 = require("web3");
const abi = require("ethereumjs-abi")

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
    //create transaction without module ethereumjs-abi
    //var addresses = loadAddress(fileAddress);
    addresses = ["F6DcEEe45C08508dF1399600D5611317300356BF",
                "c0De8a3c0061451F3f7C8bc1DeFE1F0f57Fd276D", 
                "3a047D0B3c2d03E8b6E87a8b4546B3F75b834b95"];

    var nonce = await web3.eth.getTransactionCount(fromAddress)
    console.log(nonce)
    /*Create your data. The structure of data:
        8 hex characters : hash of function prototype (use sha3 Alg).
        64 hex characters: hex string of the first parameter for function.
        similar for the second, third, .. parameters of function.

        data = 0x8hex64hex64hex.. (continuous components).
    */
    
    /*
    In this example, array parameters:
        8 hex characters : transfer(address[],uint2560)
        64 hex characters of 0x40.
        64 hex characters of value
        continuoues 64 hex for each element of array
    */
    var data = "0x";
    let prefix = web3.utils.sha3('transfer(address[],uint256)').substr(2,8);
    data = data + prefix;
    data = data + 0x40.toString(16).padStart(64, '0');

    var value = parseInt(process.argv[5]).toString().padStart(64, '0');
    data = data + value;

    data = data + parseInt(addresses.length).toString(16).padStart(64, '0');
    for (i = 0; i < addresses.length; i++) {
        data = data + addresses[i].padStart(64, '0');
    }

    var tx = createTransaction('0x4a56562aa5d1e9e6d228f35c90d9e9e0ebd85500', 
                                nonce, 0x09184e72a000, 0x27100, 0x00, data);
    if (tx == "") {
        console.log("Error");
        return;
    }

    serializedTx = signTransaction(privateKey, tx);
    web3.eth.sendSignedTransaction(serializedTx, (error, hash) => {
        if (error) {
            console.log("Error ", error);
        }
        else {
            console.log(hash);
        }
    })
}

const sendTransactionAbi = async function () {
    //create transaction using module ethereumjs-abi
    //var addresses = loadAddress(fileAddress);
    addresses = ["0xF6DcEEe45C08508dF1399600D5611317300356BF",
                "0xc0De8a3c0061451F3f7C8bc1DeFE1F0f57Fd276D", 
                "0x3a047D0B3c2d03E8b6E87a8b4546B3F75b834b95"];

    var nonce = await web3.eth.getTransactionCount(fromAddress);
    data = abi.simpleEncode("transfer(address[],uint256):(bool)", addresses, 2)
    console.log(data.toString('hex'))

    var tx = createTransaction('0x4a56562aa5d1e9e6d228f35c90d9e9e0ebd85500', 
                                nonce, 0x09184e72a000, 0x27100, 0x00, data);
    if (tx == "") {
        console.log("Error");
        return;
    }

    serializedTx = signTransaction(privateKey, tx);
    web3.eth.sendSignedTransaction(serializedTx, (error, hash) => {
        if (error) {
            console.log("Error ", error);
        }
        else {
            console.log(hash);
        }
    })
}
sendTransactionAbi();


