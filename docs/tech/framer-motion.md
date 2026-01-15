# Framer Motion

## Purpose
Framer Motionは、Reactアプリケーション向けのプロダクション対応アニメーションライブラリです。宣言的なAPIで滑らかなアニメーション、トランジション、ジェスチャーを簡単に実装できます。

## Role in this Project
- Todoアイテムの追加・削除時のスムーズなアニメーション
- ユーザーエクスペリエンスの向上
- Chakra UIコンポーネントとのシームレスな統合
- パフォーマンスの最適化されたアニメーション

## Current Usage

### Installation
```bash
pnpm add framer-motion
```

**バージョン:** 12.26.2

### Basic Integration with Chakra UI (TodoList.tsx)

#### motion.create() パターン
Chakra UIコンポーネントをアニメーション対応にする:
```tsx
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

// Chakra UIのBoxコンポーネントをアニメーション対応に変換
const MotionBox = motion.create(Box)

export const TodoList = () => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* コンテンツ */}
    </MotionBox>
  )
}
```

**重要:** `motion.div` や `motion.span` などの基本的なHTML要素の代わりに、`motion.create(ChakraComponent)` を使用することで、Chakra UIのプロップとアニメーションプロップの両方が使用できます。

## Animation Patterns

### Enter/Exit Animations with AnimatePresence

TodoアイテムのリストでEnter/Exit アニメーションを実装:
```tsx
import { Stack, Box } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTodoStore } from '../store/todoStore'
import { TodoItem } from './TodoItem'

const MotionBox = motion.create(Box)

export const TodoList = () => {
  const { todos } = useTodoStore()

  return (
    <Stack gap={3} align="stretch">
      <AnimatePresence>
        {todos.map(todo => (
          <MotionBox
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem todo={todo} />
          </MotionBox>
        ))}
      </AnimatePresence>
    </Stack>
  )
}
```

### Animation Props 説明

#### initial
要素が最初にマウントされたときの状態:
```tsx
initial={{ opacity: 0, y: -10 }}
```
- `opacity: 0`: 完全に透明
- `y: -10`: 上方向に10px移動

#### animate
要素がアニメーションする目標の状態:
```tsx
animate={{ opacity: 1, y: 0 }}
```
- `opacity: 1`: 完全に不透明
- `y: 0`: 元の位置

#### exit
要素がDOMから削除される際のアニメーション:
```tsx
exit={{ opacity: 0, x: -100 }}
```
- `opacity: 0`: フェードアウト
- `x: -100`: 左方向に100px移動

#### transition
アニメーションの詳細設定:
```tsx
transition={{ duration: 0.2 }}
```
- `duration`: アニメーションの長さ（秒単位）

### AnimatePresence の重要性
`AnimatePresence` は、コンポーネントがDOMから削除される際の exit アニメーションを可能にします。

**使用時の注意点:**
1. 各子要素に一意の `key` プロップを設定
2. 直接の子要素のみがアニメーション対応（ネストされた要素は対象外）
3. 条件付きレンダリングやリストのマッピングで使用

## Advanced Patterns

### Variants - 再利用可能なアニメーション定義

バリアントを使用してアニメーション設定を整理:
```tsx
const todoItemVariants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.15
    }
  }
}

<MotionBox
  variants={todoItemVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  <TodoItem todo={todo} />
</MotionBox>
```

### Stagger Children - 子要素の連続アニメーション

リストアイテムを順番にアニメーション:
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<MotionStack variants={containerVariants} initial="hidden" animate="visible">
  {todos.map(todo => (
    <MotionBox key={todo.id} variants={itemVariants}>
      <TodoItem todo={todo} />
    </MotionBox>
  ))}
</MotionStack>
```

### Layout Animations

要素の位置やサイズが変更されたときのアニメーション:
```tsx
<MotionBox layout>
  {/* コンテンツ */}
</MotionBox>
```

`layout` プロップを使用すると、要素の位置やサイズの変更が自動的にアニメーション化されます。

## Transition Options

### Duration
アニメーション時間の制御:
```tsx
transition={{ duration: 0.3 }}
```

### Ease
イージング関数の選択:
```tsx
transition={{ ease: 'easeInOut' }}
transition={{ ease: [0.17, 0.67, 0.83, 0.67] }} // カスタムベジェ曲線
```

利用可能なイージング:
- `linear`: 一定速度
- `easeIn`: ゆっくり開始
- `easeOut`: ゆっくり終了
- `easeInOut`: ゆっくり開始・終了

### Delay
アニメーション開始の遅延:
```tsx
transition={{ delay: 0.2 }}
```

### Type
アニメーションの種類:
```tsx
transition={{ type: 'spring', stiffness: 300, damping: 20 }}
transition={{ type: 'tween' }}
```

## Integration with Chakra UI

### Converting Chakra Components
Chakra UIコンポーネントをアニメーション対応に変換:
```tsx
import { Box, Flex, Stack, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)
const MotionStack = motion.create(Stack)
const MotionContainer = motion.create(Container)
```

### Combining Props
Chakra UIとFramer Motionのプロップを組み合わせ:
```tsx
<MotionBox
  // Chakra UI props
  p={4}
  bg="white"
  borderRadius="lg"
  shadow="md"
  // Framer Motion props
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
>
  Content
</MotionBox>
```

## Performance Considerations

### GPU Acceleration
以下のプロパティはGPUアクセラレーションされ、パフォーマンスが最適:
- `x`, `y`, `z`
- `scale`, `scaleX`, `scaleY`
- `rotate`, `rotateX`, `rotateY`, `rotateZ`
- `opacity`

**推奨:**
```tsx
// Good - GPU accelerated
<MotionBox initial={{ x: -100 }} animate={{ x: 0 }} />

// Avoid - Not GPU accelerated
<MotionBox initial={{ left: '-100px' }} animate={{ left: '0px' }} />
```

### Will-change
複雑なアニメーションでは `will-change` を使用してブラウザに最適化のヒントを提供:
```tsx
<MotionBox style={{ willChange: 'transform' }}>
```

### useReducedMotion
ユーザーのモーションプリファレンスを尊重:
```tsx
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()

<MotionBox
  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
/>
```

## Common Use Cases in this Project

### 1. Todo Item Enter Animation
新しいTodoがリストに追加されたとき:
- フェードイン (`opacity: 0 → 1`)
- 上からスライド (`y: -10 → 0`)
- 0.2秒のスムーズなトランジション

### 2. Todo Item Exit Animation
Todoが削除されたとき:
- フェードアウト (`opacity: 1 → 0`)
- 左にスライドアウト (`x: 0 → -100`)
- 素早い0.2秒のトランジション

### 3. Empty State Animation
Todo未登録時の表示（将来的に実装可能）:
```tsx
<MotionCenter
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  <EmptyState />
</MotionCenter>
```

## Development Notes

### Key Prop is Critical
`AnimatePresence` を使用する際は、必ず一意の `key` プロップを設定:
```tsx
// Good
{todos.map(todo => (
  <MotionBox key={todo.id}>
    {/* ... */}
  </MotionBox>
))}

// Bad - アニメーションが動作しない
{todos.map((todo, index) => (
  <MotionBox key={index}>
    {/* ... */}
  </MotionBox>
))}
```

### Mode in AnimatePresence
複数の要素を同時にアニメーション:
```tsx
<AnimatePresence mode="wait">
  {/* 前の要素の exit が完了してから次の要素の enter が開始 */}
</AnimatePresence>

<AnimatePresence mode="sync">
  {/* exit と enter が同時に実行 */}
</AnimatePresence>
```

現在のプロジェクトではデフォルト（mode未指定）を使用。

## Future Enhancements

### Gesture Animations
ドラッグ&ドロップでTodoを並び替え:
```tsx
<MotionBox
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  onDragEnd={handleReorder}
>
  <TodoItem todo={todo} />
</MotionBox>
```

### Page Transitions
ページ遷移アニメーション（React Router導入後）:
```tsx
<AnimatePresence mode="wait">
  <MotionBox
    key={location.pathname}
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
  >
    {children}
  </MotionBox>
</AnimatePresence>
```

### Scroll-triggered Animations
スクロールに応じたアニメーション:
```tsx
import { useScroll, useTransform } from 'framer-motion'

const { scrollY } = useScroll()
const opacity = useTransform(scrollY, [0, 200], [1, 0])

<MotionBox style={{ opacity }}>
  {/* コンテンツ */}
</MotionBox>
```

## Troubleshooting

### Exit Animations Not Working
**問題:** 要素が削除されるときにアニメーションしない。

**解決策:**
1. `AnimatePresence` で要素をラップ
2. 各子要素に一意の `key` プロップを設定
3. `exit` プロップを定義

### Layout Shift Issues
**問題:** アニメーション中にレイアウトがシフトする。

**解決策:**
- `layout` プロップを使用
- または親要素に固定の高さを設定

### Performance Issues
**問題:** アニメーションがカクつく。

**解決策:**
1. GPU加速プロパティを使用 (`x`, `y`, `scale`, `opacity`)
2. `will-change` を追加
3. `useReducedMotion` でモーション削減オプションに対応

## References
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [AnimatePresence Guide](https://www.framer.com/motion/animate-presence/)
- [Motion Variants](https://www.framer.com/motion/animation/#variants)
- [Performance Best Practices](https://www.framer.com/motion/guide-performance/)
