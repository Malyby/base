/*
    Реализовать двусторонний двусвязный список

    const list = LinkedList();
   
    list.add(1);
    list.add(2);
    list.add(3);

    console.log(list.first.value);           // 1
    console.log(list.last.value);            // 3
    console.log(list.first.next.value);      // 2
    console.log(list.first.next.prev.value); // 1
    

    Сделать связанный список итерируемым *

    for (const value of list) {
        console.log(value);
    }
*/

class LinkedListNode {
    value = null;
    next: LinkedListNode | null = null;
    prev: LinkedListNode | null = null;

    constructor(value = null) {
        this.value = value;
    }
}

export class LinkedList {
    first: LinkedListNode | null = null;
    last: LinkedListNode | null = null;

    push(val) {
        const node = new LinkedListNode(val);

        if (!this.first) this.first = node;
        if (this.last) this.last.next = node;
        node.prev = this.last
        this.last = node;
    }

    unshift(val) {
        const node = new LinkedListNode(val);

        if (this.first) this.first.prev = node;
        if (!this.last) this.last = node;
        node.next = this.first
        this.first = node;
    }

    *[Symbol.iterator]() {
        let current = this.first;
        while(current) {
            yield current.value;
            current = current.next;
        }
    }
}