import {
    ADD_TABLE,
    REMOVE_TABLE,
} from '../constants';

export const addTable = (payload) => {
    return {
        type: ADD_TABLE,
        payload
    }
}

export const removeTable = (payload) => {
     return {
        type: REMOVE_TABLE,
        payload
    }
}
