window.requestIdleCallback =  window.requestIdleCallback || function (handler) {
    let startTime = Date.now();

    return setTimeout(function () {
        handler({
            didTimeout: false,
            timeRemaining: function () {
                return Math.max(0, 50.0 - (Date.now() - startTime));
            }
        });
    }, 1);
};

function showSum(sum) {
    document.getElementById("compute-intensive-output").innerHTML = sum;
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

        if (this.root == null) {
            this.root = tmp;
            this.end = tmp;
        } else {
            this.end.next = tmp;
            this.end = tmp;
        }
    }
}

const SIZE = 5000;

function createQueue(size) {
    let queue = new Queue();

    while(size > 0) {
        queue.add(Math.floor(Math.random() * 100));
        size--;
    }

    return queue;

}

let root = createQueue(SIZE).root;

function delay() {
  var e = performance.now() + 2;
  while (performance.now() < e) {
    // Artificially long execution time.
  }
}

/** */
function recursiveSum(cur) {
    if (cur == null) {
        return 0;
    }
    delay()
    return cur.val + recursiveSum(cur.next);
}

/**
 * Click Handler : Thread Blocking
 */
function recursiveHandler() {
  var sum = recursiveSum(root);
  showSum(`Thread-Blocking Summation Done:  ${sum}`);
}



/**
 * One unit of work
 */
function traverseLinear(sum, cur) {
    sum = sum + cur.val;
    cur = cur.next;
    delay();
    return { cur, sum }
}

/**
 * Checking before every unit of work
 */
const traverseTree = (sum, cur) => (deadline) => {
    while (deadline.timeRemaining() > 0  && cur !== null) {
        const workCompleted = traverseLinear(sum, cur);
        sum = workCompleted.sum;
        cur = workCompleted.cur;
    }

    if (cur !== null) { // more work to do
        requestIdleCallback(traverseTree(sum, cur))
    }

    if (cur === null) {
        showSum(`Non Thread-Blocking Summation Done: ${sum}`);
    }

}


/**
 * Click Handler: Non Thread Blocking
 */
function linearHandler() {
    let sum = 0, cur = root;
    requestIdleCallback(traverseTree(sum, cur));


}