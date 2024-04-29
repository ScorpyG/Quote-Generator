import { OptionIcon } from '@/utils/icons';
import { Box, Divider, PopoverTrigger, Text, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import ControlOption from './ControlOptions';
import TagsList from './TagsList';

export interface QuoteProps {
  id: string;
  quote: string;
  author: string;
  createdBy: Date;
  tags: Array<string>;
}

export default function QuoteContainer(quoteProps: QuoteProps) {
  // TODO: implement authentication
  const isAdmin = true;
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    // TODO: make the card responsive
    <ControlOption isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Box
        borderWidth={'5px'}
        borderColor={'#fbc1c0'}
        borderRadius={'20px'}
        boxShadow={'6px 6px rgba(255, 192, 203, 0.5)'}
        padding={'20px'}
        maxWidth={'650px'}
      >
        {isAdmin && (
          <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Text fontStyle={'italic'} fontSize={'xs'}>
                {`Created by: ${format(quoteProps.createdBy, 'd MMM, yyyy')}`}
              </Text>
              <PopoverTrigger>
                <OptionIcon fontSize={'16px'} _hover={{ cursor: 'pointer' }} />
              </PopoverTrigger>
            </Box>
            <Divider marginY={2} />
          </>
        )}

        <Text>&quot;{quoteProps.quote}&quot;</Text>
        <Text mt={2} textAlign={'right'} fontStyle={'italic'} fontWeight={600}>
          {quoteProps.author}
        </Text>
        {quoteProps.tags.length > 0 && <TagsList tagsList={quoteProps.tags} />}
      </Box>
    </ControlOption>
  );
}
