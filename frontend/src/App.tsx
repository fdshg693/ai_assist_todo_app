import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5120/api/hello')
        if (!response.ok) {
          throw new Error('バックエンドからの応答に失敗しました')
        }
        const data = await response.json()
        setMessage(data.message || JSON.stringify(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
      {!loading && !error && (
        <div>
          <h1>バックエンドからのメッセージ</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{message}</p>
        </div>
      )}
    </div>
  )
}

export default App
