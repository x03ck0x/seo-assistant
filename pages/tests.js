import { Configuration, OpenAIApi } from "openai";
import react from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const prompt = `Generate a meta title and description for a blog post titled '${title}'. The title should be 70-80 characters long and start with the keyword 'Pest Management in New York'. The description should be a maximum of 160 characters long and should not include the keyword.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 200,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    const generatedText = response.data.choices[0].text;
    const titleRegex = /(?<=Title: ).*(?= Description:)/s;
    const descriptionRegex = /(?<=Description: ).*/s;
    const generatedTitle = generatedText.match(titleRegex)[0].trim();
    const generatedDescription = generatedText.match(descriptionRegex)[0].trim();
    setMetaTitle(generatedTitle);
    setMetaDescription(generatedDescription);
  } catch (error) {
    console.log(error);
  }
};
