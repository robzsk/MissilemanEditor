import PENS from './../pens';
import { DRAW, INCREASE_WIDTH, INCREASE_HEIGHT, DECREASE_WIDTH, DECREASE_HEIGHT } from './../actions/grid';

const initial = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];

const grid = (state, action) => {
  if (action.type === DRAW) {
    const newState = JSON.parse(JSON.stringify(state));
    const { x, y, pen } = action;
    newState[y][x] = pen.color;
    if (newState.toString() !== state.toString()) {
      return newState;
    }
  } else if (action.type === INCREASE_HEIGHT) {
    const newState = JSON.parse(JSON.stringify(state));
    const currentHeight = newState.length;
    const newHeight = currentHeight - 1;
    const width = newState[0].length;
    const lastRow = newState[newState.length - 1];
    lastRow.forEach((cell, i) => {
      if (i === 0 || i === width - 1) {
        lastRow[i] = PENS.WALL;
      } else {
        lastRow[i] = PENS.EMPTY;
      }
    });
    newState.push(new Array(width).fill(PENS.WALL));
    return newState;
  } else if (action.type === DECREASE_HEIGHT) {
    const newState = JSON.parse(JSON.stringify(state));
    const currentHeight = newState.length;
    const newHeight = currentHeight - 1;
    const width = newState[0].length;
    if (newHeight >= 5) {
      newState.pop();
      const lastRow = newState[newState.length - 1];
      lastRow.forEach((cell, i) => {
        lastRow[i] = PENS.WALL;
      });
    }
    return newState;
  } else if (action.type === INCREASE_WIDTH) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((row, i) => {
      if (i === 0 || i === newState.length - 1) {
        row[row.length - 1] = PENS.WALL;
      } else {
        row[row.length - 1] = PENS.EMPTY;
      }
      row.push(PENS.WALL);
    });
    return newState;
  } else if (action.type === DECREASE_WIDTH) {
    const newState = JSON.parse(JSON.stringify(state));
    const currentWidth = state[0].length;
    const newWidth = currentWidth - 1;
    if (newWidth >= 5) {
      newState.forEach(row => {
        row.pop();
        row[row.length-1] = PENS.WALL;
      });
    }
    return newState;
  }
  return state || initial;
};

export default grid;
