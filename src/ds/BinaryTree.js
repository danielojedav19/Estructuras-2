class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const v = Number(value);
    if (Number.isNaN(v)) return;
    const n = new Node(v);

    if (!this.root) {
      this.root = n;
      return;
    }
    let cur = this.root;
    while (true) {
      if (v === cur.value) return; // ignorar duplicados
      if (v < cur.value) {
        if (!cur.left) { cur.left = n; return; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = n; return; }
        cur = cur.right;
      }
    }
  }

  contains(value) {
    const v = Number(value);
    if (Number.isNaN(v)) return false;
    let cur = this.root;
    while (cur) {
      if (v === cur.value) return true;
      cur = v < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  traverseInOrder(visit) {
    const walk = (node) => {
      if (!node) return;
      walk(node.left);
      visit(node.value);
      walk(node.right);
    };
    walk(this.root);
  }

  traversePreOrder(visit) {
    const walk = (node) => {
      if (!node) return;
      visit(node.value);
      walk(node.left);
      walk(node.right);
    };
    walk(this.root);
  }

  traversePostOrder(visit) {
    const walk = (node) => {
      if (!node) return;
      walk(node.left);
      walk(node.right);
      visit(node.value);
    };
    walk(this.root);
  }

  // Adaptador para react-d3-tree: arreglo con un objeto raíz
  toD3() {
    const map = (node) => {
      if (!node) return null;
      const out = { name: String(node.value) };
      const children = [];
      if (node.left) children.push(map(node.left));
      if (node.right) children.push(map(node.right));
      if (children.length) out.children = children;
      return out;
    };
    return this.root ? [map(this.root)] : [];
  }

  static fromArray(arr = []) {
    const t = new BinarySearchTree();
    arr.forEach((x) => {
      const v = Number(String(x).trim());
      if (!Number.isNaN(v)) t.insert(v);
    });
    return t;
  }
}
