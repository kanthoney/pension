'use strict';

import { combineReducers } from 'redux';
import pension from './pension';
import calculate from './calculate';

export default combineReducers({ pension, calculate });

