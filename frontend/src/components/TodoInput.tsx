import { useState } from 'react'
import { Box, Input, Button, HStack } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

interface TodoInputProps {
  onAdd: (title: string) => Promise<void>
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      await onAdd(input)
      setInput('')
    } catch (error) {
      // Error is handled by the store
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Box mb={6}>
      <HStack>
        <Input
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          size="lg"
        />
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          loading={loading}
          size="lg"
        >
          <Plus size={20} />
          追加
        </Button>
      </HStack>
    </Box>
  )
}
