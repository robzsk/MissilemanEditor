import { NEW_PEN } from './../actions/pen';
import PENS from './../pens';
const initial = {
  color: PENS.WALL,
};

const pen = (state, action) => {
  if (action.type === NEW_PEN) {
    return action.pen;
  }
  return state || initial;
};

export default pen;
