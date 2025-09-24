class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  //  Elimina y retorna el elemento con menor timestamp (llegó primero)
  dequeueEarliest() {
    if (this.isEmpty()) return null;
    let minIndex = 0;
    let minTs = this.items[0]?.timestamp ?? Infinity;

    for (let i = 1; i < this.items.length; i++) {
      const ts = this.items[i]?.timestamp ?? Infinity;
      if (ts < minTs) {
        minTs = ts;
        minIndex = i;
      }
    }
    return this.items.splice(minIndex, 1)[0];
  }

  peek() {
    return this.isEmpty() ? null : this.items[0];
  }

  // Mirar quién llegó primero sin remover
  peekEarliest() {
    if (this.isEmpty()) return null;
    let earliest = this.items[0];
    for (let i = 1; i < this.items.length; i++) {
      const item = this.items[i];
      if ((item?.timestamp ?? Infinity) < (earliest?.timestamp ?? Infinity)) {
        earliest = item;
      }
    }
    return earliest;
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // Devuelve copia sin modificar
  print() {
    return [...this.items];
  }

  printOrdered() {
    return [...this.items].sort((a, b) => (a.timestamp ?? Infinity) - (b.timestamp ?? Infinity));
  }
}

export default Queue;
