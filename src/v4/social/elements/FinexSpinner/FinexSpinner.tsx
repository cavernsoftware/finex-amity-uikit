// FINEX: Create new FinexSpinner component

import React from 'react';

export interface FinexSpinnerProps {
  size?: number;
}

export function FinexSpinner({ size = 50 }: FinexSpinnerProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        role="progressbar"
        className="fe_c_progress-indicator__circle-wrapper"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          className="fe_c_progress-indicator__track-wrapper"
        >
          <title>Loading...</title>
          <circle
            className="fe_c_progress-indicator__track"
            cx="24"
            cy="24"
            r="22"
            strokeWidth="4"
            fill="none"
            shapeRendering="geometricPrecision"
          />
        </svg>
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          className="fe_c_progress-indicator__indicator-svg fe_c_progress-indicator__indicator-svg--indeterminate fe_c_progress-indicator__indicator-svg--medium"
        >
          <circle
            className="fe_c_progress-indicator__indicator-circle fe_c_progress-indicator__indicator-circle--indeterminate fe_c_progress-indicator__indicator-circle--medium"
            cx="24"
            cy="24"
            r="22"
            strokeWidth="4"
            fill="none"
            shapeRendering="geometricPrecision"
          />
        </svg>
      </div>
    </div>
  );
}
