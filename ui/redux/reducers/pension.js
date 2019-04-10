'use strict';

import { SET_PENSION } from '../actionTypes';

const initialState = {
  pot: '',
  monthly_contribution: '',
  annual_increase: '',
  expected_growth: '',
  expected_inflation: '',
  current_age: '',
  retirement_age: ''
};

export default function(state = initialState, action)
{
  switch(action.type) {
  case SET_PENSION:
    const { name, value } = action.payload;
    return {
      ...state,
      [name]: value
    }
  default:
    return state;
  }
};

