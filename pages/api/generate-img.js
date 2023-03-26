const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, n, size } = req.body;

    const response = await openai.image.create({
      prompt,
      n,
      size,
    });

    const imageUrl = response.data[0].url;

    res.json({ imageUrl });
  } catch (error) {
    console.error('Failed to generate image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
