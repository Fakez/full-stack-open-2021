import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"

import About from './components/About'
import Footer from './components/Footer'
import Menu from './components/Menu'

const Notification = ({message}) => {
  if (!message) return null;
  return (
    <div>{message}</div>
  )
}

const Anecdote = ({anecdotes}) => {
  const id = useParams().id;
  
  const anecdote = anecdotes.find(a => Number(a.id) === Number(id));
  return (

    <div>
      <h3>{anecdote.content}</h3>
      <p>{anecdote.author}</p>
      <p><a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )

}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)



const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setMessage(`anecdote '${content}' created`);
    setTimeout(() => {
      props.setMessage(null);
    }, 2000);
    history.push('/anecdotes')

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const [message, setMessage] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Notification message={message} />
        <Switch>
          <Route path='/anecdotes/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path='/anecdotes'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/create'>
            <CreateNew addNew={addNew} setMessage={setMessage} />
          </Route>
          

        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  )
}

export default App;