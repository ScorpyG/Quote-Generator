# Quote Generator (v2.0)

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/scorpy-quote-gen?style=for-the-badge)

### This project was rewritten from traditional JavaScript and React.js and Node/Express (MERN) framework

- Using [TypeScript v5](https://www.typescriptlang.org/)
- Using [Next.js v14.1.0 - Page Routes](https://nextjs.org/docs)

[<img width="1800" alt="quotegen" src="https://github.com/ScorpyG/Quote-Generator/assets/69221471/82f42c3c-5c57-43a4-b26d-b0d8a116d1d4">](https://scorpy-quote-gen.vercel.app/)

## Getting Started

First, after you cloned the repository install all necessary dependencies

```bash
yarn install
```

Second, to start the development server locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Development Resources

The technologies I used for this project:

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Next.js](https://nextjs.org/docs)
- [ChakraUI](https://v2.chakra-ui.com/getting-started)
- [React-hook-form](https://react-hook-form.com/)
- [React](https://react.dev/reference/react)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [SWR](https://swr.vercel.app/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Upcoming Features

- [x] Search by tags (Including a searchbox enable the user to enter tags name)
- [ ] Add auto complete feature to the search bar.
- [x] Revalidate `.../quote/getAllQuotes` and `.../quote/userQuotes` endpoints when user add new quote (So they don't have to refresh the page to see the changes)
- [ ] Profile image
- [ ] Quote with image
- [ ] Individual pill for each tag when enter in `AddQuoteForm`
