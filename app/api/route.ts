import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1500,
    });

    const curriculum = response.data.choices[0].text;
    res.status(200).json({ curriculum });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate curriculum' });
  }
}
