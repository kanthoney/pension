'use strict';

import { SET_PENSION, SET_PENSION_ERRORS, CALCULATE } from './actionTypes';

export const setPension = (name, value) => ({
  type: SET_PENSION,
  payload: {
    name,
    value
  }
});

export const setPensionErrors = errors => ({
  type: SET_PENSION_ERRORS,
  payload: {
    errors
  }
});

export const calculate = (data) => ({
  type: CALCULATE,
  payload: {
    data
  }
});
