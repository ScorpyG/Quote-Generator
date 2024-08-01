import { generateRandomColor } from '@/lib/theme';
import { Divider, Stack, Tag } from '@chakra-ui/react';

interface TagsListProp {
  tagsList: Array<string>;
}

export default function TagsList(tagsListProp: TagsListProp) {
  return (
    <>
      <Divider marginTop={1} marginBottom={2} />
      <Stack direction={'row'}>
        {tagsListProp.tagsList.map((tag, i) => (
          <Tag variant={'subtle'} size={'md'} colorScheme={generateRandomColor()} key={i}>
            {tag}
          </Tag>
        ))}
      </Stack>
    </>
  );
}
