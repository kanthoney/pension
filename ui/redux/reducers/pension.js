'use strict';

import { SET_PENSION, SET_PENSION_ERRORS } from '../actionTypes';

const initialState = {
  pot: '',
  monthly_contribution: '',
  annual_increase: '',
  expected_growth: '',
  expected_inflation: '',
  current_age: '',
  retirement_age: '',
  errors: {}
};

export default function(state = initialState, action)
{
  switch(action.type) {
  case SET_PENSION:
    const { name, value } = action.payload;
    let errors = { ...state.errors };
    delete errors[name];
    return {
      ...state,
      [name]: value,
      errors
    }

  case SET_PENSION_ERRORS: {
    const { errors } = action.payload;
    return {
      ...state,
      errors
    };
  }

  default:
    return state;
  }
};

