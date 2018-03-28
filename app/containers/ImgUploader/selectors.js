import { createSelector } from 'reselect';

/**
 * Direct selector to the imgUploader state domain
 */
const selectImgUploaderDomain = state => state.get('imgUploader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ImgUploader
 */

const makeSelectImgUploader = createSelector(
  selectImgUploaderDomain,
  state => state.toJS()
);

export default makeSelectImgUploader;
export {
  selectImgUploaderDomain,
};
