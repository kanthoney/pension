'use strict';

import { CALCULATE_POT, UPDATE_POT } from '../actionTypes';

const initialState = {
  errors: {}
};

export default function(state = initialState, action)
{
  switch(action.type)
  {
    case CALCULATE_POT:
    const {
      pot,
      monthly_contribution,
      annual_increase,
      expected_growth,
      expected_inflation,
      current_age,
      retirement_age
    } = action.payload.data;
    let growth = 1+expected_growth/100;
    let increase = 1+annual_increase/100;
    let inflation = 1+expected_inflation/100;
    let years = retirement_age - current_age;
    let final_pot = pot*Math.pow(growth, years);
    let annual_contribution;
    if(growth == 0) {
      annual_contribution = monthly_contribution * 12;
    } else {
      annual_contribution = monthly_contribution*(growth-1)/(Math.pow(growth, 1/12)-1);
    }
    if(growth == increase) {
      final_pot += annual_contribution*Math.pow(growth, years);
    } else {
      final_pot += annual_contribution*(Math.pow(growth, years)-Math.pow(increase, years))/(growth-increase);
    }
    return {
      expected_growth,
      annual_increase,
      ...state,
      final_pot,
      inflation_adjusted_pot: final_pot / Math.pow(inflation, years)
    };

    case UPDATE_POT: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value
      };
    }
    
    default:
    return state;
  }
};

