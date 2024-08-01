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
