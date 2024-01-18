import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import { NextApiRequest, NextApiResponse } from 'next';

function generateRandomTags(): Array<string> {
  const tags = ['demo', 'quote', 'demo quote', 'testing', 'lorem ipsum'];
  const tagLength = Math.floor(Math.random() * 5); // Limit to 3 tags

  const tagArr: Array<string> = [];

  for (let i = 0; i < tagLength; i++) {
    tagArr.push(tags[Math.floor(Math.random() * 4)]);
  }

  return tagArr;
}

async function generateTestData() {
  const demoDataList: Array<QuoteProps> = [];

  for (let i = 1; i <= 50; i++) {
    const demoData: QuoteProps = {
      id: i.toString(),
      quote:
        i % 2 === 0
          ? `${i}. Hello World! This is a test string. This absolutely has no meaning. Its only purpose is to display some texts.`
          : `${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      author: `Demo Account`,
      createdBy: new Date(),
      tags: generateRandomTags(),
    };

    demoDataList.push(demoData);
  }

  return demoDataList;
}

export default async function getQuotes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await generateTestData();

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Unable to generate demo data.' });
  }
}
