import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'



const App = () => {
 
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
      
    </div>
  )
}

export default App