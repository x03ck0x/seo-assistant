import axios from 'axios';

const generateImage = async () => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: 'a white siamese cat',
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Failed to generate image:', error);
  }
};

export default generateImage;
