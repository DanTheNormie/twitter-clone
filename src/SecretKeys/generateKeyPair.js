const crypto = require('crypto');
const fs = require('fs');

function genKeyPair(){

    const keyPair = crypto.generateKeyPairSync('rsa',{
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding:{
            type: 'pkcs1',
            format: 'pem'
        }
    })
    console.log(keyPair);

    fs.writeFile(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);
    fs.writeFile(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair();