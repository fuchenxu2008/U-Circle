/**
*
* AlumniList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import AlumniCard from 'components/AlumniCard';

export function AlumniList({ alumnis, currentUser }) {
  const alumniList = alumnis.map(alumni => (
    <AlumniCard
      key={alumni._id}
      alumni={alumni}
      currentUser={currentUser}
    />
  ));

  return (
    <div>
      <ul style={{ paddingLeft: 0 }}>
        {alumniList}
      </ul>
    </div>
  );
}

AlumniList.propTypes = {
  alumnis: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.object,
};

export default AlumniList;
