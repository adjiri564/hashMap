class HashMap{
    constructor(initialSize = 16){
        this.buckets = new Array(initialSize); //Initialize bucket array
        this.size = 0 // to keep track of the number stored in keys
    }

    hash(key){
        let hash = 0;
        for(let char of key){
            hash += char.charCodeAt(0); //Generate hash code from characters
        }
        return hash % this.buckets.length; //Apply modulo to fit in buckets
    }
    set(key, value){
        const index = this.hash(key)

        //Error to handle out of bound index
        if(index < 0 || index >= this.buckets.length){
            throw new Error("Trying to access index out of bound");
        }
        if(!this.buckets[index]){
            this.buckets[index] = [];
        }
        const bucket = this.buckets[index];
        //check if the key already exists in the bucket
        for(let i = 0; i < bucket.length; i++){
            if(bucket[i][0] === key){
                bucket[i][1] = value; //update existing key's value
                return;
            }
        }
        //if key does not exist, add a new key-value pair
        bucket.push([key, value]);
        this.size++;
    }
    get(key){
        const index = this.hash(key);
        //Error handling for out of bound index
        if(index < 0 || index >= this.buckets.length){
            throw new Error("Trying to access index out of bound");
        }
        const bucket = this.buckets[index];
        if(bucket){
            for(let i = 0; i < bucket.length; i++){
                if(bucket[i][0] === key){
                    return bucket[i][1]; //To return the value if found
                }
            }
        }
        return null; //Key not found
    }
    remove(key){
        const index = this.hash(key);
        //Error handling for out of bound index
        if(index < 0 || index >= this.buckets.length){
            throw new Error("Trying to access index out of bound");
        }
        const bucket = this.buckets[index];
        if(bucket){
            for(let i = 0; i < bucket.length; i++){
                if(bucket[i][0] === key){
                    bucket.splice(i, 1); //remove the key-value pair
                    this.size--; //decrement the size
                    return true;
                }
            }
        }
        return false; // key not found
    }
    length(){
        return this.size; // return the number of stored keys
    }
    clear(){
        this.buckets = new Array(this.buckets.length); //reset buckets
        this.size = 0;
    }
    keys(){
        const keysArray = [];
        for(let bucket of this.buckets){
            if(bucket){
                for(let [key] of bucket){
                    keysArray.push(key); //Collect all keys
                }
            }
        }
        return keysArray;
    }
    values(){
        const valuesArray = [];
        for(let bucket of this.buckets){
            if(bucket){
                for(let [, value] of bucket){
                    valuesArray.push(value);// Collect all values
                }
            }
        }
        return arrays
    }
    entries(){
        const entriesArray = [];
        for(let bucket of this.buckets){
            if(bucket){
                for(let [key, value] of bucket){
                    entriesArray.push([key, value]);//collect all key value pairs
                }
            }
        }
        return entriesArray
    }
    resize(){
        const oldBuckets = this.buckets;
        this.buckets = new Array(oldBuckets.length * 2);// double the size of the buckets
        this.size = 0;//reset size and rehash entries
        for(let bucket of oldBuckets){
            if(bucket){
                for(let[key, value] of bucket){
                    this.set(key, value);//reinsert existing entries into new bucket
                }
            }
        }
    }
}

export default HashMap;