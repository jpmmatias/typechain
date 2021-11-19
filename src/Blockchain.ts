import { Block } from './Block';
import { Transaction } from './Transcation';
import * as crypto from 'crypto';

export class Blockchain {
	chain: Block[];

	constructor(public difficulty: number = 4) {
		this.chain = [new Block('', new Transaction(100, 'BANK', 'satoshi'))];
	}

	public get lastBlock(): Block {
		return this.chain[this.chain.length - 1];
	}

	mine(nonce: number) {
		let solution = 1;

		console.log('mining..');

		while (true) {
			const hash = crypto.createHash('MD5');
			hash.update((nonce + solution).toString()).end();

			const attempt = hash.digest('hex');

			if (attempt.substr(0, this.difficulty) === '0'.repeat(this.difficulty)) {
				console.log(`Solved: ${solution}`);
				return solution;
			}

			solution += 1;
		}
	}

	public addBlock(
		transaction: Transaction,
		senderPublicKey: string,
		signature: Buffer
	) {
		const verifier = crypto.createVerify('SHA256');
		verifier.update(transaction.toString());

		const isValid = verifier.verify(senderPublicKey, signature);

		if (isValid) {
			const newBlock = new Block(this.lastBlock.hash, transaction);
			this.mine(newBlock.nonce);
			this.chain.push(newBlock);
		}
	}
}
