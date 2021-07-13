import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'


const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();
        const anecdoteContent = e.target.content.value;
        e.target.content.value = '';
        anecdoteService.create(anecdoteContent)
        .then(createdAnecdote => {
            dispatch(createAnecdote(createdAnecdote));
            dispatch(showNotification(`you created '${createdAnecdote.content}'`));
            setTimeout(() => dispatch(hideNotification()), 5000);
        })
        

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