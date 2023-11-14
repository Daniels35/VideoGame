import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '150px' }}>
        <RotatingLines strokeColor="white" height={60} width={60} animationDuration="0.98" />
      </div>
    )
  );
};

export default Loading;
