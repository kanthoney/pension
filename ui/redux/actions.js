'use strict';

import { SET_PENSION } from './actionTypes';

export const setPension = (name, value) => ({
  type: SET_PENSION,
  payload: {
    name,
    value
  }
});

