import { Wallet } from './Wallet';
import { Blockchain } from './Blockchain';

const blockchain = new Blockchain(4);

const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(blockchain, 50, bob.publicKey);
bob.sendMoney(blockchain, 23, alice.publicKey);
alice.sendMoney(blockchain, 5, bob.publicKey);

console.log(blockchain);
