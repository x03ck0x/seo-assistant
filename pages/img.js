// ImageGenerator.js
import React, { useState } from 'react';
import styles from './index.module.css';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
    const res = await fetch('/api/generate-img');
    const data = await res.json();
    setImageUrl(data.imageUrl);
  };

  return (
    <div>
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
      <style jsx global>{`
        body {
          background-color: #212129;
          color: #fff !important;
        }
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default ImageGenerator;
