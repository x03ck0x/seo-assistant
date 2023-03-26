import { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post('./api/generate-img', {
        prompt: 'a white siamese cat',
        n: 1,
        size: '1024x1024',
      });

      const { imageUrl } = response.data;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
    </div>
  );
};

export default ImageGenerator;


