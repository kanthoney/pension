'use strict';

import { CALCULATE } from '../actionTypes';

const initialState = {};

export default function(state = initialState, action)
{
  switch(action.type)
  {
    case CALCULATE:
    const {
      pot,
      monthly_contribution,
      annual_increase,
      expected_growth,
      expected_inflation,
      current_age,
      pension_age
    } = action.payload;
    let growth = 1+expected_growth/100;
    let increase = 1+annual_increase/100;
    let inflation = 1+expected_inflation/100;
    let years = pension_age - current_age;
    let final_pot = pot*Math.pow(growth, years);
    let annual_contribution;
    if(growth == 0) {
      annual_contribution = monthly_contribution * 12;
    } else {
      annual_contribution = monthly_contribution*growth/(Math.pow(growth, 1/12)-1);
    }
    if(growth === increase) {
      final_pot += annual_contribution**Math.pow(growth, years);
    } else {
      final_pot += annual_contribution*(Math.pow(growth, years)-Math.pow(increase, years))/(growth-increase);
    }
    return {
      ...state,
      pot: final_pot,
      inflation_adjusted: final_pot / Math.pow(inflation, years)
    };
    
    default:
    return state;
  }
};
