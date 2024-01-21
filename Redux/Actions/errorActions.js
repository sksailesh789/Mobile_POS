import {
   GET_ERROR
} from '../constants';

export const showError = (payload) => {
    return {
        type: GET_ERROR,
        payload
    }
}

