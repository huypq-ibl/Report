let $ = require('jquery');
const fs = require('fs');

//const Web3 = require('web3');

var owner = null;
var listAdd = null;
var dataWords = null;

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// }

var web3 = util.web3SetProvider("http://localhost:7545");

const refreshTable = function() {
    $('#contact-table').html(
        '<tr>' + 
        '<th class = "col-xs-2">S.No.</th>' +
        '<th class = "col-xs-10">Data</th>' +
        '</tr>)'
    )
}

const addEntry = function(index, data) {
    if(data) {
       let updateString = '<tr><td>'+ index + '</td><td>'+ data +'</td><td>';
       $('#contact-table').append(updateString)
    }
}

const storeFile = function() {
    if (dataWords == null)
        return;
    
    fs.writeFileSync('Wallets', '');
    let storeData = dataWords[0];
    for (let i = 1; i < dataWords.length; i++) {
        storeData += '\n' + dataWords[i];
    }
    fs.appendFileSync('Wallets', storeData);
}

$('#signin').on('click', () => {
   let words = $('#words').val()
   if (util.isMnemonic(words) == false) {
        $('#words').val('');
        $('#words').attr("placeholder", "Invalided words, type your answer again!");
   }
   else {
        alert("Signin successful");
        owner = util.getWallet(words);
   }
   console.log("*****Login*****");
});

$('#signup').on('click', () => {
    let words = util.generateNewMnemonic();
    $('#words').val(words);
    alert("Signin successful");
    owner = util.getWallet(words);
})

$('#loadExistAddresses').on('click', () => {
    if (fs.existsSync('Wallets')) {
        dataWords = fs.readFileSync('Wallets').toString().split('\n');
    }
    else {
        dataWords = util.createWallets(10);
        storeFile();
    }
    listAdd = util.loadAddresses(dataWords);

    refreshTable();
    listAdd.forEach((element, index) => {
        addEntry(index, element);
    });

});

$('#createNewAddresses').on('click', () => {
    console.log("*****CreateNewAddress*****")
    dataWords = util.createWallets(10);
    
    storeFile();
    
    listAdd = util.loadAddresses(dataWords);

    refreshTable();
    listAdd.forEach((element, index) => {
        addEntry(index, element);
        console.log(index, element);
    });
});

$('#transfer').on('click', async () => {
    if (listAdd == null) {
        alert("Please load or create new addresses! ");
        return;
    }

    var nonce = await web3.eth.getTransactionCount(util.getAddress(owner));

    /*
        '' : address of contract for transfer
    */
    let tx = await util.transfer('', util.getPrivateKey(owner), listAdd, nonce, 500000);
    util.web3SendSignedTransaction(web3, tx);

});

$('#collectToken').on('click', async () => {
    if (dataWords == null) {
        alert("Please load or create new addresses! ");
        return;
    }

    var nonce;
    var wallet;
    for (let i = 0; i < dataWords.length; i++) {
        wallet = util.getWallet(dataWords[i]);
        nonce = await web3.eth.getTransactionCount(util.getAddress(wallet));

        /*
            '' : address of contract to transfer token
        */
        tx = await util.collectToken('', nonce, util.getPrivateKey(wallet), util.getAddress(owner))
      
        util.web3SendSignedTransaction(web3, tx);
    } 
})