import React from 'react';

const Loader = () => {
  return (
    <div className={'suspense-loader-fallback'}>
      <span className="loader__ball loader__ball--1" />
      <span className="loader__ball loader__ball--2" />
      <span className="loader__ball loader__ball--3" />
    </div>
  );
};

export default Loader;
