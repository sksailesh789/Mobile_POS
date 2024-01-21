// import React, {Component,Fragment} from 'react';
// import store from "../../Redux/store";
// import { GET_ERROR, } from "../../Redux/Reducers/errorReducer";
// import {showError} from "../../Redux/Actions/errorActions"
// import AsyncStorage from '@react-native-async-storage/async-storage'



// const ErrorHandler = (WrappedComponent,axios) => {
    
//     return class extends Component {
//         state = {
//             error : null
//         }
//         componentDidMount(){
//             axios.interceptors.request.use(req => {
//                 this.setState({error:null});
//                 return req;
//             });
//             axios.interceptors.response.use(res =>  res , error => {
//                 this.setState({error:error})
//                 console.log(error.response,'intercepo');
//                 // return this.props.navigation.navigate("Error");

               
//                 if(error.response.status == "500") {
//                     console.log('first')
//                     return this.props.navigation.navigate("Error");
//                     // return this.props.history.push('/error');
//                 }
//                 if(error.response.status == "400") {
//                     console.log('trrrr')
//                 console.log(error.response.data,'letsseeee');

//                     return  store.dispatch(showError(error.response.data))

//                     // return store.dispatch({
//                     //     type: GET_ERROR,
//                     //     payload: error.response.data,
//                     //   })
                    
                   
//                 }
//                 if(error.response.status == "401" ) {
//                     AsyncStorage.removeItem("jwt");
//                     // store.dispatch({
//                     //     type: GET_ERROR,
//                     //     payload: error.response.data,
//                     //   })
//                     store.dispatch(setCurrentUser({}))
//                     return this.props.navigation.navigate("Login");
                 
//                 }
//                 if(error.response.status == "404") {
//                     console.log('404')
//                 console.log(error.response.data,'letsseeee');

//                     return  store.dispatch(showError(error.response.data))
//                     //  return this.props.navigation.navigate("Error");

//                 }
//                 console.log('unice')
//                 return store.dispatch({
//                     type: GET_ERROR,
//                     payload: error.response.data,
//                   })
//             });
//         }

//         errorConfirmedHandler = ()=> {
//             this.setState({error:null})
//         }
//         render() {
//             return (
//                     <Fragment >
                        
//                            {/* {this.state.error ? 'something went wrong' : null} */}
                        
//                         <WrappedComponent {...this.props} />
//                     </Fragment>
//             )
//         }
//     }
   
// }

// export default ErrorHandler;


import React, { useState, useEffect,useContext } from 'react';
import store from "../../Redux/store";
import { GET_ERROR, } from "../../Redux/Reducers/errorReducer";
import {showError} from "../../Redux/Actions/errorActions"
import AsyncStorage from '@react-native-async-storage/async-storage'
export const SET_CURRENT_USER = "SET_CURRENT_USER";
import AuthGlobal from "../../Context/store/AuthGlobal";

import {View,Text ,ScrollView,Dimensions,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native'

const ErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    const context = useContext(AuthGlobal);

    const setCurrentUser = (decoded, user) => {
        return {
            type: SET_CURRENT_USER,
            payload: decoded,
            userProfile: user
        }
      }

    useEffect(() => {
      const requestInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
      });
      const responseInterceptor = axios.interceptors.response.use(res => res, err => {
        setError(err);
        console.log(err.response.status, 'intercepo');
        
        if (err.response.status == "500") {
          console.log('first');
          return props.navigation.navigate("Error");
        }
        if (err.response.status == "400") {
          console.log('trrrr');
          console.log(err.response.data, 'letsseeee');
          store.dispatch(showError(err.response.data));
          return;
        }
        if (err.response.status == "401") {
            console.log('77777777777777777777777777777777777777777777777777777777')
            console.log(err.response.data, 'letsseeee');
          store.dispatch(showError(err.response.data));
          AsyncStorage.removeItem("jwt");
           context.dispatch(setCurrentUser({}));
          return props.navigation.navigate("Login");
        }
        if (err.response.status == "404") {
          console.log('404');
          console.log(err.response.data, 'letsseeee');
          store.dispatch(showError(err.response.data));
          return;
        }
        console.log('unice');
        // store.dispatch({
        //   type: GET_ERROR,
        //   payload: err.response.data,
        // });
        store.dispatch(showError(err.response.data));

      });

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <React.Fragment>
        {/* {error ? <Text>something went wrong</Text> : null} */}
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default ErrorHandler;
