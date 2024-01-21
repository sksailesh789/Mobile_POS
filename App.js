import * as React from 'react';
import { Text, View ,Button} from 'react-native';
// Context API
import Auth from "./Context/store/Auth"
// import {createNativeStackNavigator } from '@react-navigation/native-stack'

import store from './Redux/store';
import { Provider } from 'react-redux';
// import {NativeBaseProvider} from 'native-base'
import Toast from "react-native-toast-message";
import HomeNavigator from "./Context/Navigators/HomeNavigator"
import Table from './Screen/Table/Table'



export default function App() {

  return (
     <Auth>
       <Provider store={store} > 
     
        <HomeNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      
    </Provider>
     </Auth>
  );
}


