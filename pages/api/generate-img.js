const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async () => {
  try {
    const response = await openai.imageBeta.create({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
};

export default generateImage;

