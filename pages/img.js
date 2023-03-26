import React, { useState } from 'react';
import generateImage from './api/generate-img';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
    const url = await generateImage();
    setImageUrl(url);
  };

  return (
    <div>
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
    </div>
  );
};

export default ImageGenerator;
