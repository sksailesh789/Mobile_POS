import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from "../../assets/common/baseUrl"
import axios from 'axios'
import {GET_ERROR} from "../../Redux/constants"
export const SET_CURRENT_USER = "SET_CURRENT_USER";
import store from "../../Redux/store"

export const loginUser = (user, dispatch,axios)   => {
    axios
    .post(`${baseURL}users/login`,user)
    .then((data) => {
        if (data.data && data.data.success == true) {
            const token = data.data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            return dispatch(setCurrentUser(decoded, user))
        }else{
            return store.dispatch({
                type:GET_ERROR,
                payload:data.payload
            })
        }
    })
    .catch((err) => {
        store.dispatch({
            type:GET_ERROR,
            payload:err.response.data
        })
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}user/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}