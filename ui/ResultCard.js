'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Segment, Header, Form, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updatePot } from './redux/actions';
import NumberInput from './NumberInput';

class ResultCard extends React.Component
{
  render()
  {
    if(!this.props.value.final_pot) {
      return null;
    }
    return (
        <Segment>
        <Header>Results</Header>
        <p>Your pension pot at retirement would be £{this.props.value.final_pot.toFixed(2)}. Inflation adjusted,
      this would be £{this.props.value.inflation_adjusted_pot.toFixed(2)}.</p>
        <Form>

      <Form.Group>
        <NumberInput
      path="pot"
      name="expected_growth"
      label="Expected Growth (%)"
      decimal
      onChange={this.props.onChange}
      help="Expected growth rate of investments after retirement"
        />

        <NumberInput
      path="pot"
      name="annual_increase"
      label="Annual Increase (%)"
      decimal
      onChange={this.props.onChange}
      help="If you wish your income to grow annually to keep pace with inflation, enter the growth rate here"
        />
        </Form.Group>

      </Form>
        <p>The table below indicates how much annual income you can draw from your pension pot, and for how long,
      given the growth rate and annual increase entered above. This calculation does not include any state pension.</p>

        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Years of retirement</Table.HeaderCell>
        <Table.HeaderCell>Annual Income</Table.HeaderCell>
        <Table.HeaderCell>Annual Income (inflation adjusted)</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {
          [5,10,15,20,25,30,35,40,45,50].map(years => {
            let pot = this.props.value.final_pot;
            let adjusted_pot = this.props.value.inflation_adjusted_pot;
            let growth = 1+this.props.value.expected_growth/100;
            let increase = 1+this.props.value.annual_increase/100;
            let income;
            let adjusted_income;
            if(growth == increase) {
              income = pot / years;
              adjusted_income = adjusted_pot / years;
            } else {
              income = pot * Math.pow(growth, years)*(growth - increase)/(Math.pow(growth, years) - Math.pow(increase, years));
              adjusted_income = adjusted_pot * Math.pow(growth, years)*(growth - increase)/(Math.pow(growth, years) - Math.pow(increase, years));
            }
            return (<Table.Row key={`income-${years}`}>
                    <Table.Cell>{years} Years</Table.Cell>
                    <Table.Cell textAlign="right">£{income.toFixed(2)}</Table.Cell>
                    <Table.Cell textAlign="right">£{adjusted_income.toFixed(2)}</Table.Cell>
                    </Table.Row>)
          })
        }
      </Table.Body>
        </Table>
        </Segment>
    );
  }
}

export default connect(
  state => ({
    value: state.pot
  }),
  { onChange: updatePot }
)(ResultCard);

