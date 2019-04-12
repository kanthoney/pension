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
    let lump_sum_pc = parseFloat(this.props.value.lump_sum) || 0;
    let expected_growth = parseFloat(this.props.value.expected_growth) || 0;
    let annual_increse = parseFloat(this.props.value.annual_increase) || 0;
    let lump_sum = this.props.value.final_pot * lump_sum_pc / 100;
    let lump_sum_adjusted = this.props.value.inflation_adjusted_pot * lump_sum_pc / 100;
    let pot = this.props.value.final_pot - lump_sum;
    let adjusted_pot = this.props.value.inflation_adjusted_pot - lump_sum_adjusted;
    let growth = 1+parseFloat(this.props.value.expected_growth)/100;
    let increase = 1+parseFloat(this.props.value.annual_increase)/100;
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

        <NumberInput
      path="pot"
      name="lump_sum"
      label="Lump Sum (%)"
      decimal
      onChange={this.props.onChange}
      help="If you would like to take some of your pot as a lump sum, enter the percentage here"
      max={100}
        />
        </Form.Group>

      </Form>
        {lump_sum_pc?(
            <p>You have elected to take a lump sum of {lump_sum_pc.toFixed(2)}%. This would be
          £{lump_sum.toFixed(2)} (£{lump_sum_adjusted.toFixed(2)} adjusted for inflation). You would be left with
            a pot of £{pot.toFixed(2)} (£{adjusted_pot.toFixed(2)} after inflation).</p>
        ):(
          <p>You have elected not to take a lump sum from your pension pot</p>
        )}
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
            let income;
            let adjusted_income;
            if(growth == increase) {
              income = pot / years;
              adjusted_income = adjusted_pot / years;
            } else {
              income = pot * Math.pow(growth, years-1)*
                (growth - increase)/(Math.pow(growth, years) - Math.pow(increase, years));
              adjusted_income = adjusted_pot * Math.pow(growth, years-1)*
                (growth - increase)/(Math.pow(growth, years) - Math.pow(increase, years));
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

