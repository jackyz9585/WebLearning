/**
 * BST 搜索二叉树
 * 左节点存储比父节点小的值，右节点存储比父节点大的值
 */
function BinarySearchTree() {
    /**
     * 节点类
     * @param {*} key 该节点存储的值
     */
    class TreeNode {
        constructor(key) {
            this.key = key; //键
            this.left = null; //左侧子节点
            this.right = null; //右侧子节点
        }
    }
    //根节点
    let root = null;

    /**
    * 插入节点
    * @param {Number} key 该节点存储的值
     */
    this.insert = function (key) {
        let node = new TreeNode(key);
        if (root === null)
            root = node;
        else
            insertNode(root, node);
    };

    //#region  树的遍历
    /**
     * 中序遍历
     * @param {Function} callback 所执行的函数
     */
    this.inOrderTraverse = function (callback) {
        /* 
            从小到大的顺序遍历
            接收一个回调函数作为参数
        */
        inOrderTraverseNode(root, callback);
    }

    /**
     * 先序遍历
     * @param {Function} callback
     */
    this.preOrderTraverse = function (callback) {
        /* 
            先访问节点本身，再访问左节点，再右节点
        */
        preOrderTraverseNode(root, callback);
    }

    /**
     * 后序遍历
     * @param {Function} callback
     */
    this.postOrderTraverse = function (callback) {
        /*
            先遍历最底层子节点，再遍历父节点
        */
        postOrderTraverseNode(root, callback);
    }
    //#endregion

    //#region 搜索树的值
    /**
     * 搜索树中最小值
     */
    this.min = function () {
        return minNode(root);
    }

    /**
     * 搜索树中最大的值
     */
    this.max = function () {
        return maxNode(root);
    }

    /**
     * 搜索指定的值
     * @param {Number} key
     */
    this.search = function (key) {
        return searchNode(root, key);
    }

    /**
     * 删除节点
     * @param {Number} key
     */
    this.remove = function (key) {
        if (key != undefined)
            root = removeNode(root, key);
    }
    //#endregion

    //#region 私有方法
    /**
    * 私有插入新节点
    * @param {TreeNode} node 父级节点
    * @param {Function} newNode 新插入节点
    */
    let insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null)
                node.left = newNode;
            else
                insertNode(node.left, newNode);
        }
        else {
            if (node.right === null)
                node.right = newNode;
            else
                insertNode(node.right, newNode);
        }
    };

    /**
     * 中序遍历子节点递归方法
     * @param {TreeNode} node 节点
     * @param {Function} callback 回调
     */
    let inOrderTraverseNode = function (node, callback) {
        if (node !== null) {//停止递归继续执行的条件
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    };

    /**
     * 先序遍历子节点递归方法
     * @param {TreeNode} node 节点
     * @param {Function} callback 回调
     */
    let preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    };

    /**
     * 后序遍历节点递归
     * @param {TreeNode} node 
     * @param {Function} callback 
     */
    let postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    /**
     * 寻找最小节点
     * @param {TreeNode} node 
     */
    let minNode = function (node) {
        if (node) {
            while (node !== null && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    /**
     * 寻找最大节点
     * @param {TreeNode} node 
     */
    let maxNode = function (node) {
        if (node) {
            while (node !== null && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    /**
     * 搜索指定节点
     * @param {TreeNode} node 
     * @param {Number} key 
     */
    let searchNode = function (node, key) {
        if (node === null || key === undefined) return false;
        if (node.key > key) {
            searchNode(node.left, key);
        } else if (node.key < key) {
            searchNode(node.right, key);
        } else {
            return true;
        }
    }

    /**
     * 删除节点
     * @param {TreeNode} node 
     * @param {Number} key 
     */
    let removeNode = function (node, key) {
        if (node === null) return null;
        // 返回的传入节点，操作的是子节点
        if (node.key > key) {
            node.left = removeNode(node.left, key);
            return node;
        } else if (node.key < key) {
            node.right = removeNode(node.right, key);
            return node;
        } else {
            // 当传入节点的键 == key
            // 1.无子节点情况
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // 2.有一个子节点
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            // 3.有两个子节点--访问第一个右节点
            let aux = findMinNode(node.right);
            node.key = aux.key;
            //删除被更改的节点
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    }

    /**
     * 获取最小节点
     * @param {TreeNode} node 
     */
    let findMinNode = function (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }
    //#endregion

}

/**
 * 自定义函数
 * @param {Number} value 
 */
function printNode(value) {
    console.log(value);
}

// let bst = new BinarySearchTree();
// bst.insert(11);
// bst.insert(41);
// bst.insert(7);
// bst.insert(4);
// bst.insert(9);

