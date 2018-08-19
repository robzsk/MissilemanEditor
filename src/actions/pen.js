import store from './../store';

export const NEW_PEN = 'NEW_PEN';

export const changePen = color => {
  store.dispatch({ type: NEW_PEN, pen: { color } });
};
