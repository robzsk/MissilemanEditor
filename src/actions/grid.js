import store from './../store';

export const DRAW = 'DRAW';

export const INCREASE_WIDTH = 'INCREASE_WIDTH';
export const INCREASE_HEIGHT = 'INCREASE_HEIGHT';
export const DECREASE_WIDTH = 'DECREASE_WIDTH';
export const DECREASE_HEIGHT = 'DECREASE_HEIGHT';

export const increase = p => {
  if (p === 'height') {
    store.dispatch({ type: INCREASE_HEIGHT });
  } else if (p === 'width') {
    store.dispatch({ type: INCREASE_WIDTH });
  }
};

export const decrease = p => {
  if (p === 'height') {
    store.dispatch({ type: DECREASE_HEIGHT });
  } else if (p === 'width') {
    store.dispatch({ type: DECREASE_WIDTH });
  }
};

export const draw = (x, y, pen) => {
  store.dispatch({ type: DRAW, x, y, pen });
};
