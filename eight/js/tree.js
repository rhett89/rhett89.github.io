const copyArray = (arr) => {
  const newArr = [[],[],[]];

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      newArr[i][j] = arr[i][j];
    }
  }

  return newArr;
}

export class TreeNode {
  first;
  second;
  third;
  parent;
  prevStep;
  value;

  constructor(value, prevStep){
    this.first = null;
    this.second = null;
    this.third = null;
    this.parent = this.parent;
    this.prevStep = prevStep;
    this.value = copyArray(value);
  }

  getValue(){
    return copyArray(this.value);
  }

  setFirst(node){
    if(this.first){
      this.first.parent = null;
    }
    if(node){
      this.first = node;
      this.first.parent = this;
    }
  }

  setSecond(node){
    if(this.second){
      this.second.parent = null;
    }
    if(node){
      this.second = node;
      this.second.parent = this;
    }
  }

  setThird(node){
    if(this.third){
      this.third.parent = null;
    }
    if(node){
      this.third = node;
      this.third.parent = this;
    }
  }
}

