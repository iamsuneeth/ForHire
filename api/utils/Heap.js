class Heap{
    constructor(comparator){
        this.compare = comparator;
        this.heap = [];
        this.heapSize = 0;
    }

    getHeapSize() {
        return this.heapSize;
    }   
    getLeftIndex(index) {
        return 2*index+1;
    }
    getRightIndex(index) {
        return 2*index+2;
    }
    getParentIndex(index) {
        return parseInt((index-1)/2);
    }
    getLeftChild(parentIndex) {
        return this.heap[this.getLeftIndex(parentIndex)];
    }
    getRightChild(parentIndex) {
        return this.heap[this.getRightIndex(parentIndex)];
    }
    getParent(index) {
        return this.heap[this.getParentIndex(index)];
    }
    hasParent(index) {
        return this.getParentIndex(index) >=0;
    }
    hasLeftChild(index) {
        return this.getLeftIndex(index) < this.heapSize;
    }
    hasRightChild(index) {
        return this.getRightIndex(index) < this.heapSize;
    }
    add(elem) {
        this.heap.push(elem);
        this.heapSize+=1;
        this.heapifyUp();
    }
    remove() {
        let elem = this.heap[0];
        this.heap[0] = this.heap[this.heapSize-1];
        this.heap.pop(this.heapSize-1);
        this.heapSize -= 1;
        this.heapifyDown();
        return elem;
    }
    peek() {
        if(this.heapSize ==0){
            return null;
        }else {
            return this.heap[0]
        }        
    }
    heapifyDown() {
        let index = 0;
        while(this.hasLeftChild(index)){
            optimumindex = this.getLeftIndex(index);
            if(this.hasRightChild(index) && this.compare(this.getLeftChild(index), this.getRightChild(index))) {
                optimumindex = this.getRightIndex(index);
            }    
            if(!this.compare(this.heap[index],this.heap[optimumindex])) {
                break;
            }    
            else{
                this.swap(index, optimumindex);
            }    
            index = optimumindex;
            }
        }
    heapifyUp() {
        let index = this.heapSize - 1
        while(this.hasParent(index) && this.compare(this.getParent(index),this.heap[index])) {
            this.swap(this.getParentIndex(index),index);
            index = this.getParentIndex(index);
        }
    }    
    swap(indexOne, IndexTwo) {
        console.log(indexOne, IndexTwo);
        [this.heap[indexOne], this.heap[IndexTwo]] = [this.heap[IndexTwo], this.heap[indexOne]];
  }
}            

class MaxHeap extends Heap{
    constructor() {
        super(MaxHeap.comparator);
    }    
    static comparator(a,b) {
        return a.key<b.key;
    }
}        

class MinHeap extends Heap{
    constructor() {
        super(MinHeap.comparator);
    }    
    static comparator(a,b) {
        return a.key>b.key;
    }
}

module.exports = {
    MaxHeap: MaxHeap,
    MinHeap: MinHeap
}