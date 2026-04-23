import React from 'react';

const SoundButton = ({ sound, isActive, onClick }) => {
  return (
    <button 
      className={`sound-btn ${isActive ? 'active' : ''}`}
      onClick={() => onClick(sound.id)}
    >
      <span className="material-icons-outlined">{sound.icon}</span>
      {sound.label}
    </button>
  );
};

export default React.memo(SoundButton);
