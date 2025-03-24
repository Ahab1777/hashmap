class HashNode {
    constructor(key, value){
        this._key = key;
        this._value = value;
        this._nextNode = null;
    }
}

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this._loadFactor = loadFactor;
        this._capacity = capacity;
        this._bucketArray = new Array(16).fill(null);
        //TODO empty entries when grow is called
        this._totalEntries = 0;
    }

    addTotalEntries() {
        this._totalEntries ++
    }

    removeTotalEntries() {
        this._totalEntries --
    }

    grow(){
        if(this._loadFactor * this._capacity < this._totalEntries){
            //reset entries
            this._totalEntries = 0;
            //double capacity
            this._capacity = 2 * this._capacity
            //Copy bucket for reference
            const oldBucketsArray = this._bucketArray.slice();
            //Expand bucket based on capacity
            this._bucketArray = new Array(this._capacity).fill(null)
            //Re-hash everything
            for (let i = 0; i < oldBucketsArray.length; i++) {
                let targetNode = oldBucketsArray[i];
                console.log(targetNode)
                while(targetNode !== null){
                    this.set(targetNode._key, targetNode._value)
                    targetNode = targetNode._nextNode                
                }
            }
            console.log(this._bucketArray)
        }
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
        }

        return hashCode;
    }

    set(key, value) {
        //hash the key to find the index (hashCode = index on bucket)
        const index = this.hash(key);
        if (index < 0 || index >= this._bucketArray.length) {
            throw new Error("Trying to access index out of bounds");
          }
        //TODO: If bucket has item, start linked link
        if(this._bucketArray[index] === null){
            this._bucketArray[index] = new HashNode(key, value);
            this.addTotalEntries()
            return
        }

        //follow the node path until:
            //current node key is repeated, then change only value
            //nextNode of current node is Null, then add new key/value

        let currentBucketNode = this._bucketArray[index];
        while(currentBucketNode !== null){
            //overwrite if already present
            if(currentBucketNode._key === key){
                currentBucketNode._value = value;
                this.grow()
                return
            }
            //if end of linked list, add new item
            if(currentBucketNode._nextNode === null){
                currentBucketNode._nextNode = new HashNode(key, value);
                this.addTotalEntries()
                this.grow()
                return
            }
            currentBucketNode = currentBucketNode._nextNode;
        }
    }

    get(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this._bucketArray.length) {
            throw new Error("Trying to access index out of bounds");
          }
        let currentBucketHeadNode = this._bucketArray[index];
        
        while(currentBucketHeadNode !== null){
            if(currentBucketHeadNode._key === key){
                return currentBucketHeadNode._value
            }
            currentBucketHeadNode = currentBucketHeadNode._nextNode;
        }
        
    
        return null;
    }

    has(key){
        const index = this.hash(key);
        if (index < 0 || index >= this._bucketArray.length) {
            throw new Error("Trying to access index out of bounds");
          }
        let currentBucketHeadNode = this._bucketArray[index];
        while(currentBucketHeadNode !== null){
            if(currentBucketHeadNode._key === key){
                return true
            }
            currentBucketHeadNode = currentBucketHeadNode._nextNode;
        }
        
        return false;
    }

    remove(key){//TODO
        if (this.has(key)) {
            const index = this.hash(key);
            if (index < 0 || index >= this._bucketArray[index].length) {
                throw new Error("Trying to access index out of bounds");
              }
            let currentBucketHeadNode = this._bucketArray[index]
            
            //Find the item position by key
            //if there is only one item on bucket, empty bucket
            if(currentBucketHeadNode._nextNode === null){
                this._bucketArray[index] = null;
                this.removeTotalEntries()
                console.log(this._bucketArray)
                return true
            }

            //link previous item to next item so that current item is removed
            while(currentBucketHeadNode !== null){
                //If the next node is the target, bypass it my setting the current nodes nextNode to the one after the target
                if(currentBucketHeadNode._nextNode._key === key){
                    currentBucketHeadNode._nextNode = currentBucketHeadNode._nextNode._nextNode
                    return true
                }
                currentBucketHeadNode = currentBucketHeadNode._nextNode;
            }



            for(let i = 0; i < bucket.length; i++){
                if(bucket[i]._key === key){
                    bucket[i - 1]._nextNode = bucket[i]._nextNode;
                    console.log(this._bucketArray)
                    this.removeTotalEntries()
                    return true
                }
            }
        }
        console.log(this._bucketArray)
        return false
    }

    length(){
        let lengthNumber = 0;
        for (let i = 0; i < this._bucketArray.length; i++) {
            let currentBucketNode = this._bucketArray[i]

            while(currentBucketNode !== null){
                lengthNumber ++;
                currentBucketNode = currentBucketNode._nextNode
            }

        }
        return lengthNumber
    }

    clear(){
        for (let i = 0; i < this._bucketArray.length; i++) {
            this._bucketArray[i] = null;
        }
    }

    key(){
        const arrayOfKeys = [];
        for (let i = 0; i < this._bucketArray.length; i++) {
            const currentBucketNode = this._bucketArray[i]

            while(currentBucketNode !== null){
                arrayOfKeys.push(currentBucketNode._key);
                currentBucketNode = currentBucketNode._nextNode
            }

        }
        return arrayOfKeys
    }

    values(){
        const arrayOfValues = [];
        for (let i = 0; i < this._bucketArray.length; i++) {
            const currentBucketNode = this._bucketArray[i]

            while(currentBucketNode !== null){
                arrayOfKeys.push(currentBucketNode._value);
                currentBucketNode = currentBucketNode._nextNode
            }

        }
        return arrayOfKeys
    }

    entries(){

    }
}


//testing
const test = new HashMap() // or HashMap() if using a factory

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test)

test.set('jacket', 'white')
test.set('kite', 'white')
test.set('lion', 'mufasa')

console.log(test)
