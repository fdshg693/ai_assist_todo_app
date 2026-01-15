import { Box, Container, Flex, Heading, Spacer } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="white" shadow="sm" py={4}>
        <Container maxW="container.xl">
          <Flex align="center">
            <Heading size="lg" color="blue.600">
              AI Todo App
            </Heading>
            <Spacer />
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  )
}
