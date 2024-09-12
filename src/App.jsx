import { useState } from 'react'
import Produto from './PaginaProduto/Produto'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Produto></Produto>
    </>
  )
}

export default App
