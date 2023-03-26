
import React, { useEffect } from 'react';
import generateImage from './img-gen';

const ImageGenerator = () => {
  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await generateImage();
      // Do something with the image URL, e.g., set it as the src for an img element
    };

    fetchImage();
  }, []);

  // Render your component
  return <div>...</div>;
};

export default ImageGenerator;
