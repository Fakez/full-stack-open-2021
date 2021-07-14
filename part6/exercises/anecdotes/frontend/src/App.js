import React, { useEffect } from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdote'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <Notification />

      <NewAnecdote />
      
    </div>
  )
}

export default App