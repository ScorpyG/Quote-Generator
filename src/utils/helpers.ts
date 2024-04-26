import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';

export function generateTestData() {
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
      tags: ['demo', 'lorem ipsum', 'testing'],
    };

    demoDataList.push(demoData);
  }

  return demoDataList;
}
