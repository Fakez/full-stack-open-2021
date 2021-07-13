
const filterReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action.type)

    switch (action.type) {
        case 'FILTER':
            return action.data.filterString;
        default: return state;
    }
}

export const setFilter = (filterString) => {
    return {
        type: 'FILTER',
        data: {filterString}
    }
}



export default filterReducer;