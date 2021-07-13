import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();
        const anecdoteContent = e.target.content.value;
        dispatch(createAnecdote(anecdoteContent));
        dispatch(showNotification(`you created '${anecdoteContent}'`));
        setTimeout(() => dispatch(hideNotification()), 5000);

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