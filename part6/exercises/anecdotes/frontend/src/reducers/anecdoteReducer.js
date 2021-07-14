import anecdoteService from '../services/anecdote'


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action.type)

  switch (action.type) {
    case 'VOTE': 
      const id = action.data;
      const anecToChange = state.find(a => a.id === id);
      const changedAnec = {...anecToChange, votes: anecToChange.votes += 1};
      return(state.map(anec => anec.id !== id ? anec : changedAnec).sort((a,b) => b.votes - a.votes));
    case 'CREATE':
      return([...state, action.data]);
    case 'INIT':
      return action.data;
    default: return state.sort((a,b) => b.votes - a.votes);
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {

    const createdAnecdote = await anecdoteService.create(content);
    dispatch( {
      type: 'CREATE',
      data: createdAnecdote
    })
  }
}

 export const voteOn = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer