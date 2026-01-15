# Chakra UI v3

## Purpose
Chakra UIは、アクセシビリティとテーマ対応を重視したモダンなReact UIコンポーネントライブラリです。v3では新しいAPI設計とパフォーマンス改善が導入されています。

## Role in this Project
- レスポンシブで統一感のあるUIコンポーネントの提供
- アクセシビリティ対応の組み込み
- カスタムテーマによるブランディング
- プロップベースのスタイリングで開発効率向上

## Current Usage

### Installation
```bash
pnpm add @chakra-ui/react @emotion/react @emotion/styled
```

### Setup (main.tsx)
アプリケーションのエントリーポイントで `ChakraProvider` を設定:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
```

### Custom Theme Configuration (theme.ts)
カスタムテーマでフォントを設定:
```typescript
import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: '"Noto Sans JP", sans-serif' },
        body: { value: '"Noto Sans JP", sans-serif' },
      },
    },
  },
})
```

フォントは `index.html` でGoogle Fontsから読み込み:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
```

## Component Usage Examples

### Layout Components

#### Layout.tsx - アプリケーション全体のレイアウト
```tsx
import { Box, Container, Flex, Heading, Spacer } from '@chakra-ui/react'

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
```

**使用コンポーネント:**
- `Box`: 汎用コンテナ（divのラッパー）
- `Container`: コンテンツの最大幅を制御
- `Flex`: Flexboxレイアウト
- `Heading`: 見出しテキスト
- `Spacer`: Flexコンテナ内のスペース調整

#### Dashboard.tsx - グリッドレイアウト
```tsx
import { Grid, GridItem } from '@chakra-ui/react'

export const Dashboard = () => {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
      gap={6}
    >
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <TodoList />
      </GridItem>
      {/* 将来的にAI機能エリアを追加 */}
    </Grid>
  )
}
```

**レスポンシブデザイン:**
- `base`: モバイル（1カラム）
- `lg`: デスクトップ（3カラムグリッド、Todoは2カラム分）

### Form Components

#### TodoInput.tsx - 入力フォーム
```tsx
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

export const TodoInput = () => {
  return (
    <HStack gap={2} mb={4}>
      <Input
        placeholder="新しいタスクを入力..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="lg"
      />
      <IconButton
        aria-label="Add todo"
        colorScheme="blue"
        onClick={handleSubmit}
        size="lg"
      >
        <Plus size={20} />
      </IconButton>
    </HStack>
  )
}
```

**使用コンポーネント:**
- `HStack`: 水平方向のスタック（gap プロップでスペース調整）
- `Input`: テキスト入力フィールド
- `IconButton`: アイコンボタン（アクセシビリティ対応）

### Interactive Components

#### TodoItem.tsx - Checkbox コンポーネント（v3の新API）
```tsx
import { Box, IconButton, Text, HStack, Flex } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Trash2 } from 'lucide-react'

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
```

**Chakra UI v3の新しいCheckbox API:**
- `Checkbox.Root`: チェックボックスのルートコンポーネント
- `Checkbox.HiddenInput`: アクセシビリティ用の隠しinput
- `Checkbox.Control`: 実際の視覚的なチェックボックス

### Display Components

#### EmptyState.tsx - 空状態の表示
```tsx
import { Center, Stack, Text } from '@chakra-ui/react'
import { CheckCircle } from 'lucide-react'

export const EmptyState = () => {
  return (
    <Center py={12}>
      <Stack align="center" gap={4}>
        <CheckCircle size={48} color="#A0AEC0" />
        <Text color="gray.500" fontSize="lg">
          タスクがありません
        </Text>
        <Text color="gray.400" fontSize="sm">
          新しいタスクを追加してください
        </Text>
      </Stack>
    </Center>
  )
}
```

**使用コンポーネント:**
- `Center`: コンテンツを中央配置
- `Stack`: 垂直方向のスタック
- `Text`: テキスト表示

### Loading & Error States

#### TodoList.tsx - ローディングとエラー表示
```tsx
import { Spinner, Center, Text } from '@chakra-ui/react'

if (loading) {
  return (
    <Center py={12}>
      <Spinner size="xl" color="blue.500" />
    </Center>
  )
}

if (error) {
  return (
    <Center py={12}>
      <Text color="red.500" fontSize="lg">{error}</Text>
    </Center>
  )
}
```

## Chakra UI v3 の主な変更点

### 1. 新しいコンポーネントAPI
v2 と v3 で API が変更されたコンポーネント:

**Checkbox (v2 → v3)**
```tsx
// v2
<Checkbox isChecked={value} onChange={handler}>
  Label
</Checkbox>

// v3
<Checkbox.Root checked={value} onCheckedChange={handler}>
  <Checkbox.HiddenInput />
  <Checkbox.Control />
  <Checkbox.Label>Label</Checkbox.Label>
</Checkbox.Root>
```

### 2. spacing → gap への変更
```tsx
// v2
<HStack spacing={4}>...</HStack>

// v3
<HStack gap={4}>...</HStack>
```

### 3. テーマシステムの変更
```tsx
// v2
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
const theme = extendTheme({ ... })
<ChakraProvider theme={theme}>

// v3
import { createSystem, defaultConfig, ChakraProvider } from '@chakra-ui/react'
const system = createSystem(defaultConfig, { ... })
<ChakraProvider value={system}>
```

### 4. アイコンライブラリの非互換性
**重要:** `@chakra-ui/icons` v2 は Chakra UI v3 と互換性がありません。
- 代替として Lucide React を使用（詳細は [lucide-react.md](./lucide-react.md) を参照）

## Styling System

### Prop-based Styling
Chakra UIはプロップベースでスタイリング可能:
```tsx
<Box
  p={4}              // padding
  m={2}              // margin
  bg="blue.500"      // background color
  color="white"      // text color
  borderRadius="md"  // border radius
  shadow="lg"        // box shadow
/>
```

### Responsive Props
オブジェクト構文でレスポンシブデザインを実装:
```tsx
<Box
  width={{ base: '100%', md: '50%', lg: '25%' }}
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
/>
```

ブレークポイント:
- `base`: 0px以上（モバイル）
- `sm`: 480px以上
- `md`: 768px以上
- `lg`: 992px以上
- `xl`: 1280px以上

### Pseudo Props
疑似クラスもプロップで指定:
```tsx
<Box
  _hover={{ bg: 'gray.100' }}
  _focus={{ outline: 'none', shadow: 'outline' }}
  _active={{ transform: 'scale(0.95)' }}
/>
```

### Color Tokens
カラースキーマは統一されたトークンシステムを使用:
```tsx
<Button colorScheme="blue">Blue Button</Button>
<Text color="red.500">Error Text</Text>
<Box bg="gray.50">Container</Box>
```

## Development Notes

### Tree Shaking
Chakra UI v3は tree shaking に対応しており、使用したコンポーネントのみバンドルされます。

### Accessibility
すべてのコンポーネントはWAI-ARIAガイドラインに準拠:
- キーボードナビゲーション対応
- スクリーンリーダー対応
- ARIA属性の自動設定

### TypeScript Support
完全なTypeScriptサポート:
```tsx
import type { BoxProps } from '@chakra-ui/react'

interface CustomComponentProps extends BoxProps {
  customProp: string
}
```

## Troubleshooting

### Chakra UI Icons v2 が動作しない
**問題:** `@chakra-ui/icons` v2 は Chakra UI v3 と互換性がありません。

**解決策:** Lucide React を使用:
```bash
pnpm add lucide-react
```

```tsx
import { Plus, Trash2, CheckCircle } from 'lucide-react'
```

### spacing プロップが動作しない
**問題:** v3では `spacing` プロップが削除されました。

**解決策:** `gap` プロップを使用:
```tsx
// v2
<Stack spacing={4}>

// v3
<Stack gap={4}>
```

### テーマが適用されない
**問題:** v2のテーマ設定方法が動作しません。

**解決策:** v3の新しいテーマシステムを使用:
```tsx
import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: { /* カスタム設定 */ }
})
```

### コンポーネントのインポートエラー
**問題:** 一部のコンポーネント（Checkbox等）が特殊なインポートパスを使用。

**解決策:** コンポーネント別のパスからインポート:
```tsx
import { Checkbox } from '@chakra-ui/react/checkbox'
```

## Future Enhancements

### Dark Mode
カラーモードの切り替え機能:
```tsx
import { useColorMode, IconButton } from '@chakra-ui/react'

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    />
  )
}
```

### Custom Components
再利用可能なカスタムコンポーネントの作成:
```tsx
import { Box, BoxProps } from '@chakra-ui/react'

export const Card = (props: BoxProps) => (
  <Box
    p={4}
    bg="white"
    borderRadius="lg"
    shadow="md"
    {...props}
  />
)
```

### Animation Variants
Chakra UIとFramer Motionの統合をさらに活用。

## References
- [Chakra UI v3 Documentation](https://www.chakra-ui.com/)
- [Chakra UI v3 Migration Guide](https://www.chakra-ui.com/docs/get-started/migration)
- [Chakra UI GitHub](https://github.com/chakra-ui/chakra-ui)
- [Emotion Documentation](https://emotion.sh/docs/introduction)
