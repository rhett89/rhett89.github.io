import Queue from './queue.js';
import AnswerStack from './stack.js';
import { TreeNode } from './tree.js';

const WIDTH = 3;

const SUCCESS = [
  [1,2,3],
  [4,5,6],
  [7,8,0],
];

const stack = new AnswerStack();
const queue = new Queue();

let resultNode;

const getPlate = (currentPosition, value) => {
  for(let i = 0; i < currentPosition.length; i++){
    for(let j = 0; j < currentPosition[i].length; j++){
      if(currentPosition[i][j] === value){
        return {
          left: j,
          top: i,
        }
      }
    }
  }
}

const getAvailableToMove = (positionZero, currentPosition) => {
  let availableToMove = [];

  availableToMove.push({left: positionZero.left + 1, top: positionZero.top});
  availableToMove.push({left: positionZero.left - 1, top: positionZero.top});
  availableToMove.push({left: positionZero.left, top: positionZero.top + 1});
  availableToMove.push({left: positionZero.left, top: positionZero.top - 1});

  availableToMove = availableToMove.filter((elem) => elem.left >= 0 && elem.left < WIDTH && elem.top >= 0 && elem.top < WIDTH);
  availableToMove.forEach((value, index) => {availableToMove[index] = currentPosition[value.top][value.left]});

  return availableToMove;
};

const changePlates = (positionX, positionY, currentPosition, positionZero) => {
  currentPosition[positionZero.top][positionZero.left] = currentPosition[positionY][positionX]; 
  currentPosition[positionY][positionX] = 0;

  return currentPosition;
}

const traverseBFRecursive = (node, check) => {
  if(resultNode){
    return;
  }
  
  if(check(node)){
    resultNode = node;
  }
  
  const zeroPosition = getPlate(node.value, 0);
  if(!zeroPosition){
    return;
  }
  const availableToMove = getAvailableToMove(zeroPosition, node.getValue());
  
  if(availableToMove[0] !== node.prevStep){
    const step = getPlate(node.value, availableToMove[0]);
    if(step){
      node.setFirst(new TreeNode(changePlates(step.left, step.top, node.getValue(), zeroPosition), availableToMove[0]));
    }
  }
  
  if(availableToMove[1] !== node.prevStep){
    const step = getPlate(node.value, availableToMove[1]);
    if(step){
      node.setSecond(new TreeNode(changePlates(step.left, step.top, node.getValue(), zeroPosition), availableToMove[1]));
    }
  }
  
  if(availableToMove[2] !== node.prevStep){
    const step = getPlate(node.value, availableToMove[2]);
    if(step){
      node.setThird(new TreeNode(changePlates(step.left, step.top, node.getValue(), zeroPosition), availableToMove[2]));
    }
  }


  if (node.first) {
    queue.push(node.first);
  }
  
  if (node.second) {
    queue.push(node.second);
  }
  
  if (node.third) {
    queue.push(node.third);
  }

    if(!queue.isEmpty()){
      traverseBFRecursive(queue.get(), check);
    }
};

export const calculate = (startPosition) => {
  const rootNode = new TreeNode(startPosition, null);

  traverseBFRecursive(rootNode, (node) => {
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(node.value[i][j] !== SUCCESS[i][j]){
          return false;
        }
      }
    }
    
    console.log(node);
    return true;
  });

  while(resultNode.parent){
    stack.push(resultNode.prevStep);
    resultNode = resultNode.parent;
  }

  resultNode = null;
  return stack;
};