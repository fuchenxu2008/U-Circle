import { pick } from 'lodash';
import { version } from '../../package.json';

const preservedGlobalState = ['currentUser', 'token'];
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
    purgeStorageIfOld(version);
    const globalStateToSave = pick(state.global, preservedGlobalState);
    const cachedDataToSave = pick(state, cachedData);
    localStorage.setItem('globalState', JSON.stringify(globalStateToSave));
    localStorage.setItem('cachedData', JSON.stringify(cachedDataToSave));
  } catch (err) {
    console.log(`Write state to localStorage failed: ${err}`);
  }
};

const purgeStorageIfOld = latestVersion => {
  let outdated = false;
  try {
    if (localStorage.getItem('version') !== latestVersion) outdated = true;
  } catch (err) {
    outdated = true;
  }
  if (outdated) {
    localStorage.clear();
    localStorage.setItem('version', latestVersion);
  }
};
