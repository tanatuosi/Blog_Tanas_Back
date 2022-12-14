import { combineReducers } from 'redux';

import artSum from './artSum';
import avatar from './avatar';
import email from './email';
import login from './login';
import link from './link';
import mode from './mode';
import name from './name';
import navShow from './navShow';

export default combineReducers({
  navShow,
  artSum,
  avatar,
  email,
  login,
  link,
  name,
  mode
});
