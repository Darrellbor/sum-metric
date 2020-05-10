class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(val) {
    const node = new Node(val);

    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      this.tail = node;
    }

    this.length++;
    return this;
  }

  addFromFront(val) {
    const node = new Node(val);

    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      const oldHead = this.head;
      this.head = node;
      this.head.next = oldHead;
    }

    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    let counter = 0;
    let current = this.head;

    while (index !== counter) {
      current = current.next;
      counter++;
    }

    return current;
  }

  removeFromTail() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  removeFromHead() {
    if (!this.head) return undefined;
    const temp = this.head;
    this.head = temp.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    return temp;
  }

  removeFromIndex(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.removeFromHead();
    if (index === this.length - 1) return this.removeFromTail();
    const previousNode = this.get(index - 1);
    const removed = previousNode.next;
    previousNode.next = removed.next;
    this.length--;
    
    return removed;
  }
}

module.exports = SinglyLinkedList;
