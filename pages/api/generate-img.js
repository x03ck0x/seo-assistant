import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

/* const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
 */

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
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'X-User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
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
