import React from 'react';
import './progressBar.scss';

interface ProgressBarProps {
  progress: number;
  maxProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, maxProgress }) => {
  const normalizedProgress = Math.max(0, Math.min(100, (progress / maxProgress) * 100));

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