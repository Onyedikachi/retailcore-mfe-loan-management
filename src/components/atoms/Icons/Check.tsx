import React from 'react';

const CheckCustomIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
    <g filter="url(#filter0_d_9220_748270)">
      <rect x="8" y="6" width="30" height="30" rx="4" fill="white" />
      <path
        d="M26.2516 17.3734L25.3703 16.4922L21.4078 20.4547L22.2891 21.3359L26.2516 17.3734ZM28.9016 16.4922L22.2891 23.1047L19.6766 20.4984L18.7953 21.3797L22.2891 24.8734L29.7891 17.3734L28.9016 16.4922ZM15.2578 21.3797L18.7516 24.8734L19.6328 23.9922L16.1453 20.4984L15.2578 21.3797Z"
        fill="#CF2A2A"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_9220_748270"
        x="0"
        y="0"
        width="46"
        height="46"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9220_748270" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9220_748270" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default CheckCustomIcon;