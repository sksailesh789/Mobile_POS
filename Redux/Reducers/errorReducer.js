import {
   GET_ERROR
} from "../constants"


const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      {
console.log(action.payload,"qqqqqqqqqqqqqqqqqap")
        return action.payload;
      }
    default:
      return state;
  }
}
