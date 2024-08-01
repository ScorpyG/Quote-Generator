import { BlogPost } from '@/components/BlogPost';
import { getAllPosts, getBlogPostById } from '@/server/mongodb';
import { Box } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export const getStaticPaths = (async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: {
      postId: post._id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const blogPost = await getBlogPostById(params.postId as string);
  const blogPostData = JSON.parse(JSON.stringify(blogPost));

  return {
    props: {
      blogPost: blogPostData,
    },
  };
};

export default function BlogPage({ blogPost }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <Box marginX={'auto'} flex={1} width={'100%'}>
        <BlogPost {...blogPost} />
      </Box>
    </>
  );
}
