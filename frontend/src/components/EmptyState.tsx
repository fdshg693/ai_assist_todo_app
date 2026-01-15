import { Text, Stack, Box } from '@chakra-ui/react'
import { CheckCircle } from 'lucide-react'

export const EmptyState = () => (
  <Stack gap={4} py={10} align="center">
    <Box color="gray.300">
      <CheckCircle size={64} />
    </Box>
    <Text fontSize="lg" color="gray.500">
      タスクがありません
    </Text>
    <Text fontSize="sm" color="gray.400">
      新しいタスクを追加してみましょう
    </Text>
  </Stack>
)
