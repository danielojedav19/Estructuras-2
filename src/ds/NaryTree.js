// DS pura: Nodo y Árbol N-ario
export class NNode {
  constructor({ title, path = null, element = null }) {
    this.title = title;       // Texto visible
    this.path = path;         // Ruta (string) o null si solo es contenedor
    this.element = element;   // JSX (componente) o null si solo es contenedor
    this.children = [];       // Array<NNode>
  }
  addChild(node) {
    this.children.push(node);
    return node;
  }
  hasChildren() {
    return this.children.length > 0;
  }
}

export class NTree {
  constructor(root) {
    this.root = root; // NNode
  }
  dfs(visit) {
    const walk = (node) => {
      if (!node) return;
      visit(node);
      node.children.forEach(walk);
    };
    walk(this.root);
  }
}
