//队列
let Queue = (function () {
    const _items = new WeakMap();
    class Queue {
        constructor() {
            _items.set(this, []);
        }
        enqueue(e) {
            let k = _items.get(this);
            k.push(e)
        }
        dequeue() {
            let k = _items.get(this);
            return k.shift();
        }
        isEmpty() {
            let k = _items.get(this);
            return k.length == 0;
        }
        front() {
            let k = _items.get(this);
            return k[0];
        }
        size(){
            let k = _items.get(this);
            return k.length;
        }
        print() {
            let k = _items.get(this);
            console.log(k.toString());
        }
    }
    return Queue;
})();

//入队
/*let queue = new Queue();
for(let i =1;i<5;i++)
queue.enqueue(i);
queue.print();*/

// 优先队列
let PriorityQueue = (function () {
    const _items = new WeakMap();
    class QueueElement {
        constructor(e, p) {
            this.e = e;
            this.p = p;
        }
    }
    class PriorityQueue {
        constructor() {
            _items.set(this, []);
        }

        //队内元素
        enqueue(e, p) {
            let k = _items.get(this);
            let qe = new QueueElement(e, p);
            let added = false;
            for (let i = 0; i < k.length; i++) {
                if (qe.p < k[i].p) {
                    k.splice(i, 0, qe);
                    added = true;
                    break;
                }
            }
            if (!added) {
                let k = _items.get(this);
                k.push(qe);
            }
        }
        print() {
            let k = _items.get(this);
            for (let i = 0; i < k.length; i++) {
                console.log(`${i + 1}:
                element:${k[i].e} & priority:${k[i].p}`);
            }
        }
    }
    return PriorityQueue;
})();

// 击鼓传花--循环队列
function hotPotato(nameList,count){
    let queue = new Queue();
    for(let i = 0;i<nameList.length;i++)
        queue.enqueue(nameList[i]);
    while(queue.size()>1){
        for(let i =0;i<count;i++){
            queue.enqueue(queue.dequeue());
        }
        console.log(`${queue.dequeue()}被淘汰`); 
    }
    
    return queue.dequeue();
}
let name = ['a','b','c','d','e'];
let winner = hotPotato(name,7);
