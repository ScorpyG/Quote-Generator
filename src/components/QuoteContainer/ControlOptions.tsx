import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Popover, PopoverArrow, PopoverBody, PopoverContent, Text } from '@chakra-ui/react';

interface ControlOptionProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  children: JSX.Element;
}

export default function ControlOption(controlOptionProps: ControlOptionProps) {
  const { isOpen, onOpen, onClose, children } = controlOptionProps;

  return (
    <Popover placement="right" isOpen={isOpen} onClose={onClose} onOpen={onOpen} closeOnEsc>
      <PopoverContent width={'fit-content'}>
        <PopoverArrow />
        <PopoverBody display={'flex'} flexDirection={'column'} gap={3}>
          <Button gap={3} onClick={onClose} justifyContent={'flex-start'}>
            <CloseIcon />
            <Text>Close</Text>
          </Button>

          <Button gap={3} justifyContent={'flex-start'}>
            <EditIcon />
            <Text>Edit</Text>
          </Button>

          <Button gap={3} colorScheme="red" justifyContent={'flex-start'}>
            <DeleteIcon />
            <Text>Delete</Text>
          </Button>
        </PopoverBody>
      </PopoverContent>

      {children}
    </Popover>
  );
}
