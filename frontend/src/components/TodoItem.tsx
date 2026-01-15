import { Box, IconButton, Text, HStack, Flex } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Trash2 } from 'lucide-react'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={todo.isCompleted ? 'gray.50' : 'white'}
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      <HStack justify="space-between">
        <Flex align="center" gap={3}>
          <Checkbox.Root
            checked={todo.isCompleted}
            onCheckedChange={() => onToggle(todo.id)}
            size="lg"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
          <Text
            fontSize="md"
            textDecoration={todo.isCompleted ? 'line-through' : 'none'}
            color={todo.isCompleted ? 'gray.500' : 'gray.800'}
          >
            {todo.title}
          </Text>
        </Flex>
        <IconButton
          aria-label="Delete todo"
          colorScheme="red"
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 size={16} />
        </IconButton>
      </HStack>
    </Box>
  )
}
