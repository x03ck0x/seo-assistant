// pages/index.js
import React from 'react';
import HighchartsPage from './api/charts-app';
import HighchartsStock from './api/HighchartsStock';

const HomePage = () => {
  return (
    <div>
      <HighchartsPage />
      <HighchartsStock />
      <style jsx global>{`
        body {
          background-color: #212129;
          color: #fff !important;
          margin: 0;
          padding: 8px;
        }
        p, h1, h2, h3, h4, h5, h6 {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
