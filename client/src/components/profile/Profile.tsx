import React, { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>Profile of </h2>
      {user && user.username}
    </div>
  );
};

export default Profile;
