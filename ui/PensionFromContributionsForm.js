'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from 'semantic-ui-react';
import NumberInput from './NumberInput';
import { connect } from 'react-redux';
import { setPension, setPensionErrors, calculate } from './redux/actions';

class PensionFromContributionsForm extends React.Component
{
  onCalculate = () => {
    let errors = {};
    let value = {};
    for(let name of [
      'pot',
      'monthly_contribution',
      'annual_increase',
      'expected_growth',
      'expected_inflation',
      'current_age',
      'retirement_age'
    ]) {
      if(this.props.value[name] === '') {
        errors[name] = true;
      } else {
        if(name === 'current_age' || name === 'retirement_age') {
          value[name] = parseInt(this.props.value[name]);
        } else {
          value[name] = parseFloat(this.props.value[name]);
        }
      }
    };
    if(value.retirement_age <= value.current_age) {
      errors.retirement_age = true;
    }
    if(Object.keys(errors).length > 0) {
      this.props.setPensionErrors(errors);
    } else {
      this.props.calculate(value);
    }
  }

  render()
  {
    return (
        <Form>

        <Form.Group>
        <NumberInput label="Current pension pot"
      name="pot"
      decimal
      path="pension"
      onChange={this.props.onChange}
      help="Enter the current size of your pension pot"/>

        <NumberInput label="Monthly contribution"
      name="monthly_contribution"
      decimal
      path="pension"
      onChange={this.props.onChange}
      help="Enter the total monthly contribution, including employer contribution and tax relief" />

        <NumberInput label="Annual increase in contribution (%)"
      name="annual_increase"
      decimal
      path="pension"
      onChange={this.props.onChange}
      help="If you intend to increase your pension contribution each year, enter the percentage increase here"/>
        </Form.Group>


        <Form.Group>
        <NumberInput label="Expected growth (%)"
      name="expected_growth"
      decimal
      path="pension"
      onChange={this.props.onChange}
      help="This is the expected annual growth of your savings. 6% would be a conservative estimate"/>

        <NumberInput label="Expected inflation (%)"
      name="expected_inflation"
      decimal
      path="pension"
      onChange={this.props.onChange}
      help="This is the expected inflation rate. 2% would be a reasonable estimate"/>
        </Form.Group>

      
        <Form.Group>
        <NumberInput label="Current age"
      name="current_age"
      path="pension"
      onChange={this.props.onChange}
      help="Enter your current age" />

        <NumberInput label="Expected retirement age"
      name="retirement_age"
      path="pension"
      onChange={this.props.onChange}
      help="Enter your expected retirement age" />
        </Form.Group>
        

        <Button primary onClick={this.onCalculate}>Calcluate</Button>
        </Form>
    );
  }
};

export default connect(
  state => {
    return { value: { ...state.pension } }
  },
  { onChange: setPension, setPensionErrors, calculate }
)(PensionFromContributionsForm);

