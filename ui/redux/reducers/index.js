'use strict';

import { combineReducers } from 'redux';
import pension from './pension';
import pot from './pot';

export default combineReducers({ pension, pot });

