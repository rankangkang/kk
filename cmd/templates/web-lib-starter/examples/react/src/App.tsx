import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd'
import foo from 'foo'

import { useCounterStore, useCounterDispatch } from './store'

foo('hello world')

function App() {
  const counter = useCounterStore()
  const dispatch = useCounterDispatch()

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>count: {counter?.count}</h1>
      <Button
        onClick={() => {
          dispatch((counter) => {
            return {
              count: counter?.count + 1,
            }
          })
        }}
      >
        增加
      </Button>
    </>
  )
}

export default App
