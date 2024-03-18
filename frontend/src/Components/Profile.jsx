// Profile.jsx

import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default Profile;
