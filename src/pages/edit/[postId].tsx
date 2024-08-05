import { EditBlogForm } from '@/components/Forms/EditBlogForm';
import { getAllPosts, getBlogPostById } from '@/server/mongodb';
import { BlogData } from '@/types/blog';
import { Box, Text } from '@chakra-ui/react';
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
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = (async (context) => {
  const params = context.params!;
  const post = await getBlogPostById(params.postId as string);
  const postData = JSON.parse(JSON.stringify(post));

  return {
    props: {
      blog: postData,
    },
  };
}) satisfies GetStaticProps<{ blog: BlogData }>;

export default function EditPage({ blog }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Edit Blog</title>
      </Head>

      <Text as={'b'} fontSize={['xl', '3xl']} textAlign={'center'} marginY={4}>
        Update your blog post
      </Text>

      <Box flex={1} margin={'auto'} paddingBottom={[4, 8]} width={['95%', '80%', 'xl', '4xl']}>
        <Box
          margin={'auto'}
          width={'full'}
          padding={4}
          borderWidth={5}
          borderRadius={'xl'}
          borderColor={'purple.400'}
          boxShadow={'6px 6px rgba(214, 188, 250, 0.8)'}
        >
          <EditBlogForm
            /**
             * Manually passing the props as the type being return from the
             * API is different from the type of arguments. So spread operator
             * is not recommended here.
             *
             * type @BlogData -> being returned from the API
             * type @BlogFormInput -> form arguments
             */
            title={blog.title}
            contents={blog.contents}
            author={blog.author}
            tags={blog.tags}
            image={blog.image}
          />
        </Box>
      </Box>
    </>
  );
}
