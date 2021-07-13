import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, index, handleClick}) => {
    return (
        <div key={anecdote.id}>
            <div>
                {index + 1}. {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    );
}

const Anecdotes = () => {
    const dispatch = useDispatch();
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    if (filter) {
        anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

    const handleVoteClick = (anecdote) => {
        dispatch(voteOn(anecdote.id));
        dispatch(showNotification(`you voted '${anecdote.content}'`));
        setTimeout(() => dispatch(hideNotification()), 5000);
    }

    return (
        anecdotes.map((anecdote, index) =>
            <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote} 
            index={index} 
            handleClick={() => handleVoteClick(anecdote)} />
        )
    )
}

export default Anecdotes;