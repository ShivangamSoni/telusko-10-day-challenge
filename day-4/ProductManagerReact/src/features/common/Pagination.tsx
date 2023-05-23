import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { generateArray } from '@utils/generateArray';

export default function Pagination({
  totalPages,
  currentPage,
  onNext,
  onPrev,
  onPageSelect,
}: {
  totalPages: number;
  currentPage: number;
  onPageSelect: (pageNum: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const nextButton = (
    <Button variant={'outline'} colorScheme="cyan" onClick={onNext}>
      <Text srOnly>Next Page</Text>
      <ArrowForwardIcon />
    </Button>
  );

  const prevButton = (
    <Button variant={'outline'} colorScheme="cyan" onClick={onPrev}>
      <Text srOnly>Previous Page</Text>
      <ArrowBackIcon />
    </Button>
  );

  const pageButtons = (
    <HStack>
      {generateArray(totalPages).map((pageNum) => (
        <Button
          key={pageNum}
          colorScheme={currentPage === pageNum ? 'green' : 'cyan'}
          variant={currentPage === pageNum ? 'outline' : 'ghost'}
          onClick={() => onPageSelect(pageNum)}
        >
          {pageNum + 1}
        </Button>
      ))}
    </HStack>
  );

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      p={4}
      rounded={'lg'}
      shadow={'dark-lg'}
    >
      <Flex
        display={{ base: 'none', md: 'flex' }}
        justifyContent={'center'}
        gap={5}
      >
        {prevButton}
        {pageButtons}
        {nextButton}
      </Flex>

      <Flex
        display={{ base: 'flex', md: 'none' }}
        alignItems={'center'}
        justifyContent={'center'}
        direction={'column'}
        gap={5}
      >
        {pageButtons}
        <HStack gap={10}>
          {prevButton}
          {nextButton}
        </HStack>
      </Flex>
    </Box>
  );
}
