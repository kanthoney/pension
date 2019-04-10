'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Icon, Popup } from 'semantic-ui-react';

export default class NumberInput extends React.Component
{
  onChange = e => {
    if(this.props.onChange instanceof Function) {
      this.props.onChange(e.target.name, e.target.value);
    }
  }
  
  render()
  {
    return (
        <Form.Field>
        <label>
        {this.props.label} {this.props.help?<Popup trigger={<Icon size="small" name="info" />} content={this.props.help} />:''}
</label>
        <Input
      type="number"
      name={this.props.name}
      value={this.props.value}
      onChange={this.onChange} />
        </Form.Field>
    );
  }
};
