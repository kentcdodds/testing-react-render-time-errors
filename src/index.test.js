/*
Hi! Need help with React Testing Library? The best way to get it is by forking
this repository, making a reproduction of your issue (or showing what you're
trying to do), and posting a link to your fork on our Discord chat:

https://testing-library.com/discord
*/

// here's an example
import * as React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'

const CountContext = React.createContext()
function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function CountProvider({children}) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  const value = {state, dispatch}
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}
function useCount() {
  const context = React.useContext(CountContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

function Counter() {
  const {state, dispatch} = useCount()
  return (
    <div>
      {state.count}
      <button onClick={() => dispatch('decrement')}>-</button>
      <button onClick={() => dispatch('increment')}>+</button>
    </div>
  )
}

// mock console.error to do nothing because it logs an error when there's a
// rendering error and we don't need those locks mucking up our output.
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('useCount throws an error when not rendered in the CountProvider', async () => {
  expect(() => render(<Counter />)).toThrow(
    /useCount must be used within a CountProvider/i,
  )
  // React logs to console.error twice when there's a rendering error
  expect(console.error).toHaveBeenCalledTimes(2)
})
