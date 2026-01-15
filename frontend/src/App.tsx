import './App.css'
import { TodoList } from './components/TodoList'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <TodoList />
    </div>
  )
}

export default App
