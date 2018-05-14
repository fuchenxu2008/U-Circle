/*
 *
 * MyStuffPage actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';
import * as api from './api';

export function getMyStuff({ id, type }) {
  return {
    type: DEFAULT_ACTION,
    payload: api.getMyStuff({ id, type }),
  };
}
