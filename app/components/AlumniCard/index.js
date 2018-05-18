/**
*
* AlumniCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './AlumniCard.css';

function AlumniCard({ alumni, history }) {
  console.log('alumni: ', alumni);
  return (
    <div className="alumni-card" onClick={() => history.push(`/user/${alumni._id}`)}>
      <div className="big-avatar" style={{ backgroundImage: `url(${alumni.avatar})` }}></div>
      <div className="alumni-card-info">
        <div className="alumni-card-nickname">{alumni.nickname}</div>
      </div>
    </div>
  );
}

AlumniCard.propTypes = {
  alumni: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(AlumniCard);
