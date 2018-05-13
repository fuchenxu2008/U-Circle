import { pick } from 'lodash';

const preservedGlobalState = ['currentUser', 'token'];
const locationState = ['location.pathname'];
const cachedData = ['studentPage', 'alumniPage'];

export const loadState = type => {
  try {
    const serializedState = localStorage.getItem(type);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const globalStateToSave = pick(state.global, preservedGlobalState);
    const locationStateToSave = pick(state.route, locationState);
    const cachedDataToSave = pick(state, cachedData);
    localStorage.setItem('globalState', JSON.stringify(globalStateToSave));
    localStorage.setItem('route', JSON.stringify(locationStateToSave));
    localStorage.setItem('cachedData', JSON.stringify(cachedDataToSave));
  } catch (err) {
    console.log(`Write state to localStorage failed: ${err}`);
  }
};
