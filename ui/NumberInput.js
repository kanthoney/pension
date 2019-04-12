'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Icon, Popup } from 'semantic-ui-react';
import { connect }from 'react-redux';

class NumberInput extends React.Component
{
  validate = this.props.decimal?/^\d*(?:\.\d*)?$/:/^\d*$/;

  onChange = e => {
    if(this.props.onChange instanceof Function && this.validate.test(e.target.value)) {
      this.props.onChange(e.target.name, e.target.value);
    }
  }
  
  render()
  {
    return (
        <Form.Field error={this.props.error || !this.validate.test(this.props.value)}>
        <label>
        {this.props.label}
      {this.props.help?<Popup trigger={<Icon size="small" name="info" />} content={this.props.help} />:''}
      </label>
        <Input
      type="number"
      name={this.props.name}
      value={this.props.value}
      min={this.props.min}
      max={this.props.max}
      step={this.props.step}
      onChange={this.onChange} />
        </Form.Field>
    );
  }
};

export default connect(
  (state, ownProps) => ({
    value: state[ownProps.path][ownProps.name],
    error: state[ownProps.path].errors[ownProps.name]
  })
)(NumberInput);

