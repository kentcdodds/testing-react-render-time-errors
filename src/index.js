import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <>
      <p>
        Hi! Need help with React Testing Library? The best way to get it is by
        forking this repo, making a reproduction of your issue (or
        showing what you're trying to do), and posting a link to it on our
        Discord chat:
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://testing-library.com/discord"
      >
        testing-library.com/discord
      </a>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
