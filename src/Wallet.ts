import * as crypto from 'crypto';
import { Transaction } from './Transcation';
import { Blockchain } from './Blockchain';

export class Wallet {
	public publicKey: string;
	public privateKey: string;

	constructor() {
		const keypair = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2048,
			publicKeyEncoding: { type: 'spki', format: 'pem' },
			privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
		});

		this.privateKey = keypair.privateKey;
		this.publicKey = keypair.publicKey;
	}

	sendMoney(blockchain: Blockchain, amount: number, payeePublicKey: string) {
		const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

		const sign = crypto.createSign('SHA256');
		sign.update(transaction.toString()).end();

		const signature = sign.sign(this.privateKey);
		blockchain.addBlock(transaction, this.publicKey, signature);
	}
}
