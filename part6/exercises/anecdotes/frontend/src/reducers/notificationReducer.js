const anecdotesAtStart = [
    'notification 0',
  ]
  

const notificationReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action.type)

    switch (action.type) {
        case 'SHOW':
            return action.data.notificationContent;
        case 'HIDE':
            return null;
        case 'SET':
            return action.data;
        default: return state;
    }
}

export const showNotification = (notificationContent) => {
    return {
        type: 'SHOW',
        data: {notificationContent}
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE',
        data: null
    }
}

export const setNotification = (notificationMessage, time) => {

    return dispatch => {
        dispatch ({
            type: 'SET',
            data: notificationMessage
        })

        setTimeout(() => {
            dispatch ({ 
                type: 'SET',
                data: null
            })
        }, time * 1000);

    }
}



export default notificationReducer;