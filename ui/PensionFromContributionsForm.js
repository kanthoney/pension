'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from 'semantic-ui-react';
import NumberInput from './NumberInput';
import { connect } from 'react-redux';
import { setPension } from './redux/actions';

class PensionFromContributionsForm extends React.Component
{
  onCalculate = () => {
    console.log(this.props);
  }

  render()
  {
    return (
        <Form>

        <Form.Group>
        <NumberInput label="Current pension pot"
      name="pot"
      value={this.props.pot}
      onChange={this.props.onChange}
      help="Enter the current size of your pension pot"/>

        <NumberInput label="Monthly contribution"
      name="monthly_contribution"
      value={this.props.monthly_contribution}
      onChange={this.props.onChange}
      help="Enter the total monthly contribution, including employer contribution and tax relief" />

        <NumberInput label="Annual increase in contribution (%)"
      name="annual_increase"
      value={this.props.annual_increase}
      onChange={this.props.onChange}
      help="If you intend to increase your pension contribution each year, enter the percentage increase here"/>
        </Form.Group>


        <Form.Group>
        <NumberInput label="Expected growth (%)"
      name="expected_growth"
      value={this.props.expected_growth}
      onChange={this.props.onChange}
      help="This is the expected annual growth of your savings. 6% would be a conservative estimate"/>

        <NumberInput label="Expected inflation (%)"
      name="expected_inflation"
      value={this.props.expected_inflation}
      onChange={this.props.onChange}
      help="This is the expected inflation rate. 2% would be a reasonable estimate"/>
        </Form.Group>

      
        <Form.Group>
        <NumberInput label="Current age"
      name="current_age"
      value={this.props.current_age}
      onChange={this.props.onChange}
      help="Enter your current age" />

        <NumberInput label="Expected retirement age"
      name="retirement_age"
      value={this.props.retirement_age}
      onChange={this.props.onChange}
      help="Enter your expected retirement age"/>
        </Form.Group>
        

        <Button primary onClick={this.onCalculate}>Calcluate</Button>
        </Form>
    );
  }
};

export default connect(
  state => {
    return { ...state.pension }
  },
  { onChange: setPension }
)(PensionFromContributionsForm);

