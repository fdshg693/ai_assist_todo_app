import { useEffect } from 'react'
import { Stack, Box, Heading, Text, Spinner, Center } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTodoStore } from '../store/todoStore'
import { TodoInput } from './TodoInput'
import { TodoItem } from './TodoItem'
import { EmptyState } from './EmptyState'

const MotionBox = motion.create(Box)

export const TodoList = () => {
  const { todos, loading, error, fetchTodos, createTodo, toggleTodo, removeTodo } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading && todos.length === 0) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="blue.500" />
      </Center>
    )
  }

  return (
    <Box>
      <Heading mb={6} size="xl">Todoリスト</Heading>
      {error && (
        <Box mb={4} p={3} bg="red.50" borderRadius="md" borderLeft="4px solid" borderColor="red.500">
          <Text color="red.700">{error}</Text>
        </Box>
      )}
      <TodoInput onAdd={createTodo} />
      <Stack gap={3} align="stretch">
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence>
            {todos.map(todo => (
              <MotionBox
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={removeTodo}
                />
              </MotionBox>
            ))}
          </AnimatePresence>
        )}
      </Stack>
    </Box>
  )
}
