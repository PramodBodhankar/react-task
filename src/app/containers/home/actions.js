export const actions = {
    FETCH_FRIENDS:'FETCH_FRIENDS',
    ADD_TO_LIST:'ADD_TO_LIST',
    REMOVE_FROM_LIST:'REMOVE_FROM_LIST'
}
export const fetchFriends = () => {
    return {
        type: actions.FETCH_FRIENDS
    };

};
export const addToList = (name)=>{
    return {
        type: actions.ADD_TO_LIST,
        payload: {
            name
        }
    };
}

export const removeFromList = (frnd)=>{
    return {
        type: actions.REMOVE_FROM_LIST,
        payload: {
            frnd
        }
    };
}