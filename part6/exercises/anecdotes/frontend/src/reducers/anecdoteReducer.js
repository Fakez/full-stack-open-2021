
const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action.type)

  switch (action.type) {
    case 'VOTE': 
      const id = action.data.id;
      const anecToChange = state.find(a => a.id === id);
      const changedAnec = {...anecToChange, votes: anecToChange.votes += 1};
      return(state.map(anec => anec.id !== id ? anec : changedAnec).sort((a,b) => b.votes - a.votes));
    case 'CREATE':
      const newAnecdote = action.data.createdAnecdote;
      return([...state, newAnecdote]);
    case 'INIT':
      return action.data.anecdotes;
    default: return state.sort((a,b) => b.votes - a.votes);
  }
}

export const createAnecdote = (createdAnecdote) => {
  return {
    type: 'CREATE',
    data: {createdAnecdote}
  }
}

 export const voteOn = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: {anecdotes}
  }
}

export default anecdoteReducer