import React from 'react';

const ProfileAvatar = ({ avatar, name }) => {
  // Simple placeholder: display first letter of name
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  return (
    <div className="w-24 h-24 bg-gray-500 rounded-md flex items-center justify-center m-2 cursor-pointer hover:ring-2 hover:ring-white">
      {/* Later, this can be an img tag if avatar is a URL */}
      <span className="text-white text-4xl font-bold">{initial}</span>
    </div>
  );
};
export default ProfileAvatar;
