import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();
        dispatch(createAnecdote(e.target.content.value));
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='content'/></div>
                <button>create</button>
            </form>
        </>
    )
     
}

export default NewAnecdote;