import BlogPost, { BlogPostProps } from '@/components/BlogPost/BlogPost';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';

export default function BlogPage() {
  const blogPostPlaceholder: BlogPostProps = {
    title: 'How can Spair help you?',
    author: 'Spair Creator',
    postedDate: 'July 17, 2024',
    contents: [
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, obcaecati tempora. 
      Ipsa labore aliquam blanditiis ab architecto nihil veritatis commodi quis minus magni? 
      Voluptatibus eos repudiandae, sapiente laudantium cumque quidem! Lorem ipsum, dolor 
      sit amet consectetur adipisicing elit. Quas cum odio, molestiae nihil ducimus inventore? 
      Doloribus ex perspiciatis fugit, obcaecati tempora eum alias, consectetur officia amet, 
      sapiente minus quos provident.`,

      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, obcaecati tempora. 
      Ipsa labore aliquam blanditiis ab architecto nihil veritatis commodi quis minus magni? 
      Voluptatibus eos repudiandae, sapiente laudantium cumque quidem!`,

      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, obcaecati tempora. 
      Ipsa labore aliquam blanditiis ab architecto nihil veritatis commodi quis minus magni? 
      Voluptatibus eos repudiandae, sapiente laudantium cumque quidem! Lorem ipsum, dolor 
      sit amet consectetur adipisicing elit. Quas cum odio, molestiae nihil ducimus inventore? 
      Doloribus ex perspiciatis fugit, obcaecati tempora eum alias, consectetur officia amet, 
      sapiente minus quos provident.`,
    ],
    imageUrl: '/image.png',
    tags: ['Spair', 'SaaS', 'Productivity', 'Collaboration'],
  };

  // TODO: Fetch blog post data from API

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <Box marginX={'auto'} flex={1} width={'100%'}>
        <BlogPost {...blogPostPlaceholder} />
      </Box>
    </>
  );
}
