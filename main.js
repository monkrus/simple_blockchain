const {Blockchain, Transaction} = require('./blockchain');



let coin = new Blockchain();
coin.createTransaction(new Transaction('address1', 'address2', 100));
coin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
coin.minePendingTransactions('evgeniy-address');

console.log('\nBalance of evgeniy is', coin.getBalanceOfAddress('evgeniy-address'));

console.log('\n Starting the miner again...');
coin.minePendingTransactions('evgeniy-address');

console.log('\nBalance of evgeniy is', coin.getBalanceOfAddress('evgeniy-address'));








//console.log('Mining block 1 ...');
//coin.addBlock(new Block(1, "02/02/2019", {amount: 4}));

//console.log('Mining block 2 ...');
//coin.addBlock(new Block(2, "02/08/2019", {amount: 7}));


//console.log('Is blockchain valid? ' + coin.isChainvalid());

//coin.chain[1].data = {amount: 100};
//coin.chain[1].hash -coin.chain[1].calculateHash();
//console.log('Is blockchain valid? ' +coin.isChainvalid());
//console.log(JSON.stringify(coin, null, 4));

 