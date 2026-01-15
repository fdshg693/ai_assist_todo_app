# Lucide React

## Purpose
Lucide Reactは、美しくカスタマイズ可能なオープンソースアイコンライブラリです。1000以上のアイコンを提供し、React向けに最適化されています。

## Role in this Project
- UIコンポーネントへの視覚的なアイコン提供
- Chakra UI Icons v2の代替（v3との互換性問題により）
- 一貫したアイコンデザイン言語の維持
- カスタマイズ可能なサイズと色

## Why Lucide React?

### Chakra UI Icons v2 との互換性問題
**重要:** `@chakra-ui/icons` v2 は Chakra UI v3 と互換性がありません。

Chakra UI v3にアップグレードした際、以下のエラーが発生:
```
Module not found: Can't resolve '@chakra-ui/system'
```

**解決策:** Lucide Reactへの移行
- Chakra UI v3と完全互換
- 豊富なアイコンセット（1000+ アイコン）
- 軽量でツリーシェイキング対応
- シンプルなAPI

## Current Usage

### Installation
```bash
pnpm add lucide-react
```

**バージョン:** 0.562.0

### Basic Usage

#### Import
必要なアイコンのみをインポート（ツリーシェイキング対応）:
```tsx
import { Plus, Trash2, CheckCircle } from 'lucide-react'
```

## Icon Usage in Components

### 1. TodoInput.tsx - Plus Icon
Todoの追加ボタン:
```tsx
import { Plus } from 'lucide-react'
import { Button } from '@chakra-ui/react'

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  return (
    <Button
      colorScheme="blue"
      onClick={handleSubmit}
      size="lg"
    >
      <Plus size={20} />
      追加
    </Button>
  )
}
```

**使用理由:**
- 「追加」アクションを視覚的に表現
- 直感的なUX

### 2. TodoItem.tsx - Trash2 Icon
Todoの削除ボタン:
```tsx
import { Trash2 } from 'lucide-react'
import { IconButton } from '@chakra-ui/react'

export const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  return (
    <IconButton
      aria-label="Delete todo"
      colorScheme="red"
      variant="ghost"
      size="sm"
      onClick={() => onDelete(todo.id)}
    >
      <Trash2 size={16} />
    </IconButton>
  )
}
```

**使用理由:**
- 削除アクションの明確な視覚表現
- ゴミ箱アイコンは普遍的に認知されている

### 3. EmptyState.tsx - CheckCircle Icon
Todo未登録時の空状態表示:
```tsx
import { CheckCircle } from 'lucide-react'
import { Box, Stack, Text } from '@chakra-ui/react'

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
```

**使用理由:**
- 完了・達成を象徴するポジティブなアイコン
- 空状態を友好的に表現

## Customization Options

### Size
アイコンのサイズをピクセル単位で指定:
```tsx
<Plus size={16} />  // 小さい
<Plus size={20} />  // 中くらい
<Plus size={24} />  // 大きい
<Plus size={64} />  // 非常に大きい
```

### Color
Chakra UIのカラースキームと組み合わせ:
```tsx
// Chakra UIのBoxでラップして色を制御
<Box color="blue.500">
  <Plus size={20} />
</Box>

<Box color="red.500">
  <Trash2 size={16} />
</Box>

<Box color="gray.300">
  <CheckCircle size={64} />
</Box>
```

### Stroke Width
線の太さをカスタマイズ:
```tsx
<Plus size={20} strokeWidth={1.5} />  // 細い
<Plus size={20} strokeWidth={2} />    // 標準（デフォルト）
<Plus size={20} strokeWidth={3} />    // 太い
```

### Additional Props
SVGの標準プロップも使用可能:
```tsx
<Plus
  size={20}
  strokeWidth={2}
  className="custom-icon"
  style={{ cursor: 'pointer' }}
  onClick={handleClick}
/>
```

## Integration with Chakra UI

### IconButton Integration
Chakra UIの `IconButton` と組み合わせ:
```tsx
import { IconButton } from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'

<IconButton
  aria-label="Delete"
  icon={<Trash2 size={16} />}
  colorScheme="red"
  variant="ghost"
/>

// または子要素として直接配置
<IconButton aria-label="Delete" colorScheme="red">
  <Trash2 size={16} />
</IconButton>
```

### Button Integration
通常のボタン内でアイコンとテキストを組み合わせ:
```tsx
import { Button } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

<Button colorScheme="blue">
  <Plus size={20} />
  追加
</Button>
```

### Box for Color Control
Chakra UIの `Box` でアイコンの色を制御:
```tsx
import { Box } from '@chakra-ui/react'
import { CheckCircle } from 'lucide-react'

<Box color="green.500">
  <CheckCircle size={24} />
</Box>
```

## Available Icons in Project

### Current Icons
| アイコン | 用途 | コンポーネント | サイズ |
|---------|------|--------------|--------|
| `Plus` | Todo追加 | TodoInput.tsx | 20px |
| `Trash2` | Todo削除 | TodoItem.tsx | 16px |
| `CheckCircle` | 空状態表示 | EmptyState.tsx | 64px |

### Common Icons for Future Use
プロジェクトで将来的に使用する可能性のあるアイコン:

**Navigation & Actions**
```tsx
import {
  Menu,           // ハンバーガーメニュー
  Settings,       // 設定
  Search,         // 検索
  Filter,         // フィルター
  ArrowLeft,      // 戻る
  ArrowRight,     // 進む
  ChevronDown,    // ドロップダウン
  ChevronUp       // ドロップダウン（閉じる）
} from 'lucide-react'
```

**Status & Feedback**
```tsx
import {
  AlertCircle,    // 警告
  XCircle,        // エラー
  Info,           // 情報
  CheckCheck,     // 完了
  Clock,          // 時間
  Calendar        // カレンダー
} from 'lucide-react'
```

**Content & Media**
```tsx
import {
  Edit,           // 編集
  Save,           // 保存
  Download,       // ダウンロード
  Upload,         // アップロード
  Copy,           // コピー
  Share           // 共有
} from 'lucide-react'
```

**AI Features (Future)**
```tsx
import {
  Sparkles,       // AI機能
  Lightbulb,      // 推奨・アイデア
  MessageSquare,  // チャット
  Zap             // 自動化
} from 'lucide-react'
```

## Best Practices

### 1. Consistent Sizing
同じ文脈では一貫したサイズを使用:
```tsx
// Good - 統一されたサイズ
<Plus size={20} />
<Trash2 size={20} />

// Avoid - バラバラなサイズ
<Plus size={20} />
<Trash2 size={16} />
```

### 2. Semantic Usage
アイコンの意味が直感的に理解できるように:
```tsx
// Good - 削除にゴミ箱アイコン
<Trash2 />

// Avoid - 削除にXアイコン（閉じると混同）
<X />
```

### 3. Accessibility
`IconButton` には必ず `aria-label` を設定:
```tsx
// Good
<IconButton aria-label="Delete todo">
  <Trash2 size={16} />
</IconButton>

// Bad - スクリーンリーダーが理解できない
<IconButton>
  <Trash2 size={16} />
</IconButton>
```

### 4. Performance
必要なアイコンのみインポート（自動的にツリーシェイキング）:
```tsx
// Good - 必要なアイコンのみ
import { Plus, Trash2 } from 'lucide-react'

// Avoid - 全体をインポート（存在しない）
import * as Icons from 'lucide-react'
```

## Development Notes

### Tree Shaking
Lucide Reactは自動的にツリーシェイキングに対応。使用していないアイコンはバンドルに含まれません。

### TypeScript Support
完全なTypeScriptサポート:
```tsx
import type { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: number
}
```

### SSR (Server-Side Rendering)
Next.jsなどのSSRフレームワークでも問題なく動作します（将来的に使用する可能性）。

## Comparison with Alternatives

### vs @chakra-ui/icons
| 特徴 | Lucide React | @chakra-ui/icons |
|------|-------------|------------------|
| Chakra UI v3 互換性 | ✅ あり | ❌ なし |
| アイコン数 | 1000+ | 100+ |
| サイズ | 軽量 | 軽量 |
| カスタマイズ | 高い | 中程度 |

### vs React Icons
| 特徴 | Lucide React | React Icons |
|------|-------------|-------------|
| アイコンスタイル | 統一 | 複数ライブラリ |
| サイズ | 小さい | 大きい |
| 一貫性 | 高い | ライブラリ依存 |

### vs Material Icons
| 特徴 | Lucide React | Material Icons |
|------|-------------|----------------|
| デザイン | モダン | Material Design |
| カスタマイズ | 容易 | 限定的 |
| ライセンス | MIT | Apache 2.0 |

## Troubleshooting

### Icon Not Displaying
**問題:** アイコンが表示されない。

**解決策:**
1. インポートが正しいか確認
2. `size` プロップを設定
3. 親要素の色を確認（透明ではないか）

### Size Too Small/Large
**問題:** アイコンのサイズが意図した通りでない。

**解決策:**
- `size` プロップで明示的にサイズを指定
- Chakra UIの `Box` でラップして追加制御

### Color Not Applying
**問題:** 色が変わらない。

**解決策:**
- Chakra UIの `Box` でラップし、`color` プロップを使用
- または直接 `color` プロップを渡す:
```tsx
<Plus size={20} color="#FF0000" />
```

## Future Enhancements

### Icon Component Wrapper
再利用可能なアイコンラッパー:
```tsx
import type { LucideIcon } from 'lucide-react'
import { Box, BoxProps } from '@chakra-ui/react'

interface IconWrapperProps extends BoxProps {
  icon: LucideIcon
  size?: number
}

export const IconWrapper = ({ icon: Icon, size = 20, ...props }: IconWrapperProps) => (
  <Box display="inline-flex" {...props}>
    <Icon size={size} />
  </Box>
)
```

### Animated Icons
Framer Motionと組み合わせたアニメーション:
```tsx
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const MotionPlus = motion(Plus)

<MotionPlus
  size={20}
  animate={{ rotate: 180 }}
  transition={{ duration: 0.3 }}
/>
```

### Icon Set Documentation
プロジェクト用のアイコンカタログページ（Storybook風）。

## References
- [Lucide React Documentation](https://lucide.dev/guide/packages/lucide-react)
- [Lucide Icons List](https://lucide.dev/icons/)
- [Lucide GitHub](https://github.com/lucide-icons/lucide)
- [Why We Chose Lucide Over Chakra UI Icons](https://github.com/chakra-ui/chakra-ui/discussions/7593)
