const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor (fromAddress, toAddress, amount){
        this.fromAddress =fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}

class Block {
    constructor ( timestamp, transactions, previousHash=""){
     //index*-where it sits on blockchain;timestamp-time created;
     //data*-sender/reciever/how much was transfered; previous hash
     //data* was changed to transactions in the third part of video
     //index* was removed in the third part of the video


     //this.index = index;
     this.timestamp = timestamp ;
     this.transactions = transactions;
     this.previousHash = previousHash;
     this.hash = this.calculateHash();
     this.nonce = 0;
     //this "saves this object, creates an instance of it"
    }

calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp +JSON.stringify(this.data)+ this.nonce).toString();
    //JSON.stringify converts JS objects into string
    }
mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !==Array(difficulty + 1).join("0")){
    this.nonce++;
        this.hash = this.calculateHash();    
    }
console.log("Block mined: " + this.hash);
}
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty =2;
        this.pendingTransactions = [];
        this.miningReward =100;
    }

createGenesisBlock() {
    return new Block ( "01/01/2019", "Genesis block", "0");
    // index was removed from genesis block
}

getLatestBlock() {
    return this.chain[this.chain.length - 1];
    //length-1 changes upper limit value
}

/*addBlock(newBlock) {
newBlock.previousHash= this.getLatestBlock().hash;
newBlock.mineBlock(this.difficulty);
//newBlock.hash = newBlock.calculateHash();
this.chain.push(newBlock);
}*/

minePendingTransactions (miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block succesfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
        new Transaction(null, miningRewardAddress , this.miningReward)
    ];
}

createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
}

getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
        for (const trans of block.transactions) {
            if(trans.fromAddress === address) {
            balance -= trans.amount;
        }
    if(trans.toAddress === address) {
        balance += trans.amount;
            }
        }

    }
return balance;

}


isChainvalid() {
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
module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
