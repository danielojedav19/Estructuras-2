// Nodo para LinkedList
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null; // para simular "canción actual"
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    if (!this.current) this.current = this.head;
  }

  next() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current ? this.current.value : null;
  }

  reset() {
    this.current = this.head;
    return this.current.value;
  }

  getCurrent() {
    return this.current ? this.current.value : null;
  }
}