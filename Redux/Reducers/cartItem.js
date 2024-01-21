import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from "../constants"

const cartItems = (state = [] , action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.find(x => x.product._id === item.product._id)
            if(existItem){
                return state.map(x =>  x.product._id === existItem.product._id ? item : x)
            }
            return [...state,action.payload]
        case REMOVE_FROM_CART:
            return state.filter(cartItem => {
                return cartItem.product._id !== action.payload})
        case CLEAR_CART :
            return state = []
        }
        return state;
}

export default cartItems;