const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index, timestamp, data, previousHash=""){
     //index-where it sits on blockchain;timestamp-time created;
     //data-sender/reciever/how much was transfered; previous hash
     this.index = index;
     this.timestamp = timestamp ;
     this.data = data;
     this.previousHash = previousHash;
     this.hash = this.calculateHash();
     //this "saves this object, creates an instance of it"
    }

calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp +JSON.stringify(this.data)).toString();
    //JSON.stringify converts JS objects into string
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

createGenesisBlock() {
    return new Block (0, "01/01/2019", "Genesis block", "0");
}

getLatestBlock() {
    return this.chain[this.chain.length - 1];
    //length-1 changes upper limit value
}

addBlock(newBlock) {
newBlock.previousHash= this.getLatestBlock().hash;
newBlock.hash = newBlock.calculateHash();
this.chain.push(newBlock);
}


isChainvalid(){
for (let i= 1; i<this.chain.length; i++){
const currentBlock =this.chain[i];
const previousBlock = this.chain[i-1];


if(currentBlock.hash !== currentBlock.calculateHash()){
    return false;
}

if(currentBlock.previousHash !== previousBlock.hash){
    return false;

    }
}
return true;

}
}

let coin =new  Blockchain();
coin.addBlock(new Block(1, "02/02/2019", {amount: 4}));
coin.addBlock(new Block(2, "02/08/2019", {amount: 7}));


//console.log('Is blockchain valid? ' + coin.isChainvalid());

//coin.chain[1].data = {amount: 100};
//coin.chain[1].hash -coin.chain[1].calculateHash();
//console.log('Is blockchain valid? ' +coin.isChainvalid());
console.log(JSON.stringify(coin, null, 4));

 