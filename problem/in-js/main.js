class TreeNode {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class QNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    } 
}

class Queue {
    constructor() {
        this.root = null;
        this.end = null;
    }

    add(val) {
        let tmp = new QNode(val, null);
        if(this.root == null) {
            this.root = tmp;
            this.end = tmp;
        } else {
            this.end.next = tmp;
            this.end = tmp;
        }        
    }   

    delete() {
        let tmp = this.root;
        this.root = this.root.next;
        return tmp;
    }

    isEmpty() {
        if(this.root == null) return true;
        return false;
    }
}

const SIZE = 3000;

function buildTree(size) {
    let queue =new Queue();
    let root = new TreeNode(Math.floor(Math.random() * 100), null, null);
    queue.add(root);
    size--;
    while(!queue.isEmpty()) {
        let top = queue.delete();
        if(size > 0) {
            let tmp = new TreeNode(Math.floor(Math.random() * 100), null, null);
            top.val.left = tmp;
            queue.add(tmp);
            size--;
        }
        if(size > 0) {
            let tmp = new TreeNode(Math.floor(Math.random() * 100), null, null);
            top.val.right = tmp;
            queue.add(tmp);
            size--;
        }
    } 
    return root;
}

const root = buildTree(SIZE);

function delay() {
    var e = performance.now() + 2;
    while (performance.now() < e) {
        // Artificially long execution time.
    }
}

function recursiveSum(cur) {
    if (cur == null) {
        return 0;
    }
    delay()
    return cur.value + recursiveSum(cur.left) +  recursiveSum(cur.right);
}

function recursiveHandler() {
    var sum = recursiveSum(root);
    console.log(sum);
}

function traverseLinear(cur, lim) {
    let result = 0;
    for(let i = 0; i < lim; i++) {
        if(cur == null) break;
        result += cur.value;
        cur = cur.next;
    }
    return {cur, result};
}



function linearHandler() {
    let sum = 0, cur = root;
    // for(let i = 0; i < 10; i++) {
    //     setTimeout(() => {
    //         let res = traverseLinear(cur, SIZE / 10);
    //         sum += res.result;
    //         cur = res.cur;
    //     }, 0)
    // }
    // setTimeout(() => console.log(sum), 0);


}