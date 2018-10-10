var keythereum = require('keythereum');
var fs = require('fs');

function createAddress(password) {
    /*
        Create private key and address from password
        public key -> store to file
        address -> return
    */
    var params = {
        keyBytes: 32,
        ivBytes: 16
    }
    var dk = keythereum.create(params);
    
    var options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
          c: 262144,
          dklen: 32,
          prf: "hmac-sha256"
        }
    };
    var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    fs.writeFileSync('./Huy', JSON.stringify(keyObject) + '\n');

    return keyObject.address;
    // keythereum.exportToFile(keyObject, './')
}

function getPrivateKey(password, address) {
    /*
    Get private key from passward and address
    */

    var data = fs.readFileSync('./Huy').split('\n');
    var keyObject;
    for (let i = 0; i < data.length; i++) {
        keyObject = JSON.parse(data[i]);
        if (keyObject.address == address)
            return keythereum.recover(password, keyObject);
    }
    
    return "";
}

module.exports = {
    createAddress,
    getPrivateKey
}