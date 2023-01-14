export default class AnswerStack {
  #count = 0;
  #storage = {};

  push(value){
    this.#storage[this.#count] = value;
    this.#count++; 
  }

  pop(){
    if(!this.#count){
      return null;
    }
    this.#count--;
    const output = this.#storage[this.#count];
    delete this.#storage[this.#count];

    return output;
  }

  size(){
    return this.#count;
  }
};
