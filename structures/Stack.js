export default class Stack {
  constructor(items = []) {
    this.items = [...items]; 
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.length === 0 ? null : this.items.pop();
  }

  peek() {
    return this.items.length === 0 ? null : this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  // devuelve array con top primero 
  toArrayTopFirst() {
    return [...this.items].reverse();
  }

  print() {
    console.log("Stack (top -> bottom):", this.toArrayTopFirst());
    return this.toArrayTopFirst();
  }
}
