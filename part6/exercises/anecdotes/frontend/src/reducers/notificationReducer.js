const anecdotesAtStart = [
    'notification 0',
  ]
  
  
  const notificationReducer = (state = anecdotesAtStart, action) => {
    console.log('state now: ', state)
    console.log('action', action.type)
  
    switch (action.type) {
        default: return state;
    }
  }
  

  
  export default notificationReducer;