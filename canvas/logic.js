const canvas = document.querySelector('.canvas-eight');
const ctx = canvas.getContext('2d');

const SIZE = 200;
const GAP = 20;
const PLATE_COLOR = "#05f77e";
const TEXT_COLOR = "#ffffff";

const coefficient = Number((canvas.width / 100).toFixed(2));

const gameField = [
  [8,2,4],
  [1,5,3],
  [7,6,0],
];

let availableToMove = [];
const positionZero = {
  left: 0,
  top: 0,
};

const drawPlate = (positionX, positionY, value) => {
  if(value === 0){
    return;
  }

  const left = positionX * 220;
  const top = positionY * 220;

  ctx.fillStyle = PLATE_COLOR;
  ctx.fillRect(left, top, SIZE, SIZE);
  
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = "80px Roboto";
  ctx.fillText(value.toString(), left + 70, top + 120);
}

const getAvailableToMove = () => {
  availableToMove = [];

  availableToMove.push({left: positionZero.left + 1, top: positionZero.top});
  availableToMove.push({left: positionZero.left - 1, top: positionZero.top});
  availableToMove.push({left: positionZero.left, top: positionZero.top + 1});
  availableToMove.push({left: positionZero.left, top: positionZero.top - 1});

  availableToMove = availableToMove.filter((elem) => elem.left >= 0 && elem.left < gameField.length && elem.top >= 0 && elem.top < gameField.length);
  availableToMove.forEach((value, index) => {availableToMove[index] = gameField[value.top][value.left]});
};

const renderField = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameField.forEach((array, positionY) => 
  array.forEach((value, positionX) => {
    if(value === 0){
      positionZero.left = positionX;
      positionZero.top = positionY;
    }
    drawPlate(positionX, positionY, value)
  }));

  getAvailableToMove();
};

const getPlateByCoord = (coord) => {
  if(coord <= 640 && coord >= 440){
    return 2;
  }

  if(coord <= 420 && coord >= 220){
    return 1;
  }

  if(coord <= 200 && coord >= 0){
    return 0;
  }

  return -1;
}

const changePlates = (positionX, positionY) => {
  gameField[positionZero.top][positionZero.left] = gameField[positionY][positionX]; 
  positionZero.left = positionX;
  positionZero.top = positionY;
  gameField[positionY][positionX] = 0;

  renderField();
}

renderField();

canvas.addEventListener('click', (evt) => {
  const rect = evt.target.getBoundingClientRect();

  const coords = {
    x: getPlateByCoord(Math.floor((100 * evt.offsetX / rect.width) * coefficient)),
    y: getPlateByCoord(Math.floor((100 *evt.offsetY / rect.height) * coefficient)),
  }

  if(coords.x >= 0 && coords.y >= 0){
    if(availableToMove.includes(gameField[coords.y][coords.x])){
      changePlates(coords.x, coords.y);
    }
  }

});
