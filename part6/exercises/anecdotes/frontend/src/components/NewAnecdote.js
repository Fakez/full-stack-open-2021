import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'


const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();
        const anecdoteContent = e.target.content.value;
        e.target.content.value = '';
        dispatch(createAnecdote(anecdoteContent))
        // dispatch(showNotification(`you created '${anecdoteContent}'`));
        // setTimeout(() => dispatch(hideNotification()), 5000);

        dispatch(setNotification(`you created '${anecdoteContent}'`, 2));
        

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