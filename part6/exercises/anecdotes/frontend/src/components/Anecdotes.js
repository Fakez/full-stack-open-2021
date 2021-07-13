import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state.anecdotes)

    return (
        anecdotes.map((anecdote, index) =>
            <Anecdote anecdote={anecdote} index={index} handleClick={() => dispatch(voteOn(anecdote.id))} />
        )
    )
}

export default Anecdotes;