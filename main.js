const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, new Date(), "Genesis block data of patient goes here", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(var i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true
    }
}

let patientRecord = new Blockchain();
patientRecord.addBlock(new Block(1, new Date(), {name: "Jeff", Operation: "Tuli"}));
patientRecord.addBlock(new Block(2, new Date(), {name: "Jeff", Operation: "Langgas"}));

console.log("Is blockchain valid? " + patientRecord.isChainValid());

patientRecord.chain[1].data.name = "Jep";
patientRecord.chain[1].hash = patientRecord.chain[1].calculateHash(); 

console.log("Is blockchain valid? " + patientRecord.isChainValid());


// console.log(JSON.stringify(patientRecord, null, 4));