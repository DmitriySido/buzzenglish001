import React from 'react';
import './progressBar.scss';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${normalizedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;