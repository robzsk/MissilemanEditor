import { NEW_PEN } from './../actions/pen';
import PENS from './../pens';
const initial = {
  color: PENS.WALL,
};

const pen = (state, action) => {
  // bail early
  if (state === undefined) {
    return initial;
  }

  switch (action.type) {
    case NEW_PEN:
      return action.pen;
    default:
      return state;
  }
};

export default pen;
