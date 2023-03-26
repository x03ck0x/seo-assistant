const YOUR_API_KEY = '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';

const generateImage = async () => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${YOUR_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: 'a white siamese cat',
        n: 1,
        size: '1024x1024',
      }),
    });
    console.log('Response:', response);

    const responseData = await response.json();

    console.log('Response Data:', responseData);

    const imageUrl = responseData.data[0].url;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Failed to generate image:', error);
  }
};

export default generateImage;
