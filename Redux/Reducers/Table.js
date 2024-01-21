import {
    ADD_TABLE,
    REMOVE_TABLE,
} from "../constants"

const Table = (state = {} , action) => {
    switch(action.type) {
        case ADD_TABLE:
            return action.payload
        case REMOVE_TABLE:
            return state = {}
        default:
        return state;
}
}

export default Table;