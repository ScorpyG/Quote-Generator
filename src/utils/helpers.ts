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

// RegEx Patterns
export const NAME_PATTERN = /^[A-Za-z]+$/;
export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const PROFANITY_WORDS = /fuck|fk|shit|fag|pussy|cunt|bitch|slut|twat|nigg|whore|dick/i;

// Social Media Links
export const PERSONAL_GITHUB = 'https://github.com/ScorpyG';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/justin-gia-hoang/';
export const DEV_COMMUNITY_URL = 'https://dev.to/scorpyg';
