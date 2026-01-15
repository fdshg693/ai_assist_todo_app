import { Grid, GridItem } from '@chakra-ui/react'
import { TodoList } from './TodoList'

export const Dashboard = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={{ base: 12, lg: 8 }}>
        <TodoList />
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 4 }}>
        {/* Plan 2実装後に有効化 */}
        {/* <AIRecommendation /> */}
        {/* <TodoSummary /> */}
      </GridItem>
    </Grid>
  )
}
