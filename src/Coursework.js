class Node {
  constructor(value, name) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.name = null || name;
  }
}

class NameNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
export default class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  push(value, name) {
    let tree = this.root;
    if (!tree) {
      this.root = name === undefined ? new NameNode(value) : new Node(value, name);
      return;
    }
    function recurse(tree) {
      if (value < tree.value) {
        if (!tree.left) {
          tree.left = name === undefined ? new NameNode(value) : new Node(value, name);
          return;
        } else recurse(tree.left);
      } else if (!tree.right) {
        tree.right = name === undefined ? new NameNode(value) : new Node(value, name);
        return;
      } else recurse(tree.right);
    }

    recurse(tree);
  }

  doBalanced() {
    function maxDepth(root) {
      if (!root) return 0;
      return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    let subtreeDifference = root => maxDepth(root.left) - maxDepth(root.right);

    function recursion(root, height) {
      let newRoot, difference;
      if (root !== null) {
        root.left = recursion(root.left, height + 1);
        root.right = recursion(root.right, height + 1);
        if (Math.abs((difference = subtreeDifference(root))) >= 2) {
          if (difference > 0) {
            newRoot = root.left;
            root.left = root.left.right ? root.left.right : null;
            newRoot.right = root;
          } else {
            newRoot = root.right;
            root.right = root.right.left ? root.right.left : null;
            newRoot.left = root;
          }
          root = newRoot;

          if (Math.abs((difference = subtreeDifference(root))) >= 2) {
            difference > 0
              ? (root.left = recursion(root.left, height))
              : (root.right = recursion(root.right, height));

            if (!height)
              if (Math.abs(difference = subtreeDifference(root) >= 2))
              if (difference > 0) {
                newRoot = root.left;
                root.left = root.left.right ? root.left.right : null;
                newRoot.right = root;
              } else {
                newRoot = root.right;
                root.right = root.right.left ? root.right.left : null;
                newRoot.left = root;
              }
              root = newRoot;
              return root;
            }
        }
      }
      return root;
    }
    return recursion(this.root, 0);
  }
}
