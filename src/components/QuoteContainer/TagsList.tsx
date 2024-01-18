import { generateRandomColorScheme } from '@/utils/helpers';
import { Badge, Divider, Stack } from '@chakra-ui/react';

interface TagsListProp {
  tagsList: Array<string>;
}

export default function TagsList(tagsListProp: TagsListProp) {
  return (
    <>
      <Divider marginTop={1} marginBottom={2} />
      <Stack direction={'row'}>
        {tagsListProp.tagsList.map((tag, i) => (
          <Badge variant={'subtle'} colorScheme={generateRandomColorScheme()} key={i}>
            {tag}
          </Badge>
        ))}
      </Stack>
    </>
  );
}
