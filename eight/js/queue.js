export default class Queue {
  #queue;
  constructor(){
    this.#queue = [];
  }

  push(value){
    this.#queue.push(value);
  }

  get(){
    return this.#queue.shift();
  }

  isEmpty(){
    return this.#queue.length === 0;
  }
};
