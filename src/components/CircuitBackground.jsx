import React from 'react';

const CircuitBackground = ({ opacity = 0.05 }) => {
  return (
    <div className="circuit-container">
      <svg
        className="circuit-svg"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 50 H30 M70 50 H100 M50 0 V30 M50 70 V100"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <circle cx="50" cy="50" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M30 50 L50 30 M50 70 L70 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
      <div className="circuit-overlay"></div>
    </div>
  );
};

export default React.memo(CircuitBackground);
