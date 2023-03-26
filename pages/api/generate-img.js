// pages/api/generate-img.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const response = await openai.imageBeta.create({
      prompt: 'a white siamese cat',
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Failed to generate image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
