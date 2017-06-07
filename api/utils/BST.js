function Node (data, key, left, right){
    this.data = data;
    this.key = key;
    this.left = left;
    this.right = right;
}

class BST {
    constructor() {
        this.root = null;
    }
    getRoot(){
        return this.root;
    }

    setRoot(node){
        this.root = node;
    }
    add(data){
        let result = this.insert(this.getRoot(),data);
        if(result===null)
            return false
        else
            this.setRoot(result);
        return true;
    }
    insert(node, data){
        if(node === null){
            return new Node(data,data.key,null,null);
        }
        if(node.key > data.key){
            node.left = this.insert(node.left, data);
        } else{
            node.right = this.insert(node.right, data);
        }    
        
        return node;
    }

     minNode(node){
        current = node;
        while(current.left!==null){
            current = current.left;
        }
        return current;
    }

    remove(key){
        let result = delete(this.getRoot(),key);
        if(result==null)
            return false
        return true;        
    }
    delete(root,key){
        if(root === null){
            return root;
        }

        if(root.key > key){
            root.left = this.delete(root.left, key);
        }else if(root.key < key){
            root.right = this.delete(root.right, key);
        }else {
            if(root.left === null){
                node = root.right;
                root = null;
                return node;
            }else if(root.right === null){
                node = root.left;
                root = null;
                return node;
            }

            node = this.minNode(root.right);
            root.key = node.key;
            root.right = delete(root.right,node.key);
        }
        return root;  
    }
    findBestMatch(key){
        let bestTaxi = this.searchBestMatch(this.getRoot(),key);
        this.remove(bestTaxi.key);
        return bestTaxi;
    }
    searchBestMatch(root, key){
        let result;
        if(root === null){
            return root;
        }
        if(root.key < key){
            result = this.searchBestMatch(root.right, key);
            return result!== null ? result:root.data;
        }else if(root.key > key){
            result = this.searchBestMatch(root.left, key);
            return result!== null ? result:root.data;
        }else{
            return root.data;
        }
    }


}
module.exports = BST;
