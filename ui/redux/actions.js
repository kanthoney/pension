'use strict';

import { SET_PENSION, SET_PENSION_ERRORS, CALCULATE_POT, UPDATE_POT } from './actionTypes';

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

export const calculatePot = (data) => ({
  type: CALCULATE_POT,
  payload: {
    data
  }
});

export const updatePot = (name, value) => ({
  type: UPDATE_POT,
  payload: {
    name,
    value
  }
});

