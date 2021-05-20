//单向链表
function LinkedList() {
    //节点
    let Node = function (e) {
        this.e = e;
        this.next = null;
    }

    let length = 0, head = null;
    //向尾部添加节点e
    this.append = function (e) {
        let node = new Node(e),
            current;
        if (head == null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    }
    
    //在p处插入节点e
    this.insert = function (p, e) {
        if (p >= 0 && p <= length) {
            let node = new Node(e), current = head, previous, index = 0;
            if (p === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < p) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        } else {
            return false;
        }
    }
    //删除p位置的节点
    this.removeAt = function (p) {
        //检查越界,head索引位为0
        if (p > -1 && p < length) {
            let current = head, previous, index = 0;
            if (p === 0) {
                head = current.next;
            } else {
                while (index++ < p) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;//10-15p 15-20c => 10-20p.e-c.next 15为c.e
            }
            length--;
            return current.e;
        } else {
            return null;
        }
    }
    //删除一个节点e
    this.remove = function (e) {
        let index = this.indexOf(e);
        return this.removeAt(index);
    }
    //节点e的索引
    this.indexOf = function (e) {
        let current = head, index = 0;
        while (current) {
            if (e === current.e) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    this.isEmpty = function () {
        return length === 0;
    }
    this.size = function () {
        return length;
    }

    this.getHead = function () {
        return head;
    }
    //只输出节点的值
    this.toString = function () {
        let current = head, string = '';
        while (current) {
            string += current.e + (current.next ? 'n' : '');
            current = current.next;
        }
        return string;
    }
}

let list = new LinkedList();

//双向链表
function DoublyLinkedList() {
    class Node {
        constructor(e) {
            this.e = e;
            this.prev = null;
            this.next = null;
        }
    }
    let length = 0;
    let head = null;//头节点
    let tail = null;//尾节点

    this.insert = function (e, p) {
        if (p >= 0 && p <= length) {
            let node = new Node(e), current = head, previous, index = 0;
            if (p == 0) {
                if (!head) {
                    //没有头节点
                    head = node;
                    tail = node;
                } else {
                    //头节点后移
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if (p == length) {
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while (index++ < p) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        } else {
            return false;
        }
    }

    this.removeAt = function (p) {
        if (p > -1 && p < length) {
            let current = head, previous, index;
            if (p == 0) {
                head = current.next;//只有1个节点 current.next == null => head = null
                if (length == 1) {
                    //只有1个节点
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if (p == length - 1) {
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                while (index++ < p) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;//current.next指向的是current的下一个节点
            }
            length--;
            return current.e;
        } else {
            return null;
        }
    }
}

let doublyList = new DoublyLinkedList();
