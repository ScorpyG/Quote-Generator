# QuoteGen (v2.0)

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/spair-blog?style=for-the-badge)

### This project was rewritten from traditional JavaScript and React.js and Node/Express (MERN) framework

- This project is repurpose to serve as a blog website for Spair
- Using [TypeScript v5](https://www.typescriptlang.org/)
- Using [Next.js v14.1.0 - Page Routes](https://nextjs.org/docs)

[<img width="1800" alt="quotegen" src="https://github.com/ScorpyG/Quote-Generator/assets/69221471/82f42c3c-5c57-43a4-b26d-b0d8a116d1d4">](https://spair-blog.vercel.app/)

## Getting Started

First, after you cloned the repository install all necessary dependencies

```bash
yarn install
```

Second, add necessary environment variables (well I suggest get your own)

```
NODE_ENV = "development"
.
..
...
.....
MONGODB_CREDENTIALS = your_credentials
```

Third, to start the development server locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Development Resources

The technologies I used for this project:

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Next.js](https://nextjs.org/docs)
- [Chakra UI](https://v2.chakra-ui.com/getting-started)
- [React-hook-form](https://react-hook-form.com/)
- [React](https://react.dev/reference/react)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [SWR](https://swr.vercel.app/)
- [Uploadthing](https://uploadthing.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Upcoming Features

- [ ] Implement pagination.
- [ ] Update user profile picture once uploaded (by rerunning auth hook????) | update the SWR auth cache
- [ ] Close the input modal after successfully upload.
- [ ] Unify the model typings to align with the schema (DO NOT DEFINE TYPES AS U GO). Should be using Schema modal as Source type and extends from there
