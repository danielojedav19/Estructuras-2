class DNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  append(value) {
    const node = new DNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    if (!this.current) this.current = this.head;
  }

  next() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current.value;
  }

  prev() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current.value;
  }

  getCurrent() {
    return this.current ? this.current.value : null;
  }
}
