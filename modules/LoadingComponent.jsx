import React from 'react';
import { CircularProgress } from '@material-ui/core';

const LoadingComponent = ({ address }) => {
  return (
    <div className="text-center">
      <CircularProgress size={42} />
      <p>
        Fetching the NFTs of address: <span className='font-bold'>{address}</span>
      </p>
    </div>
  );
};
export default LoadingComponent;
