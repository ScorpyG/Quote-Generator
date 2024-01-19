import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';

export function generateRandomColorScheme(): string {
  const colorSchemes = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];

  return colorSchemes[Math.floor(Math.random() * (colorSchemes.length - 1))];
}

export function generateRandomTags(): Array<string> {
  const tags = ['demo', 'quote', 'demo quote', 'testing', 'lorem ipsum'];
  const tagLength = Math.floor(Math.random() * 5); // Limit to 3 tags

  const tagArr: Array<string> = [];

  for (let i = 0; i < tagLength; i++) {
    tagArr.push(tags[Math.floor(Math.random() * 4)]);
  }

  return tagArr;
}

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
      tags: generateRandomTags(),
    };

    demoDataList.push(demoData);
  }

  return demoDataList;
}
