import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button,Image } from "react-native";
// import CheckBox from 'expo-checkbox';
import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage'
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponent/EasyButton";
import axios from "axios"
import AuthGlobal from "../../Context/store/AuthGlobal";
import { connect } from "react-redux";
import baseURL from "../../assets/common/baseUrl"
import ErrorHandler from "../Error/ErrorHandler"
export const SET_CURRENT_USER = "SET_CURRENT_USER";
import {loginUser} from "../../Context/actions/Auth.actions.js"
import { useFocusEffect } from '@react-navigation/native';


const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailerror, setEmailError] = useState({});
  const [passworderror, setPasswordError] = useState("");
  const [isSelected, setSelection] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (context.stateUser.isAuthenticated === true) {
        console.log(context.stateUser,'##########################')
        props.navigation.navigate("Table");
      }

     
    }, [context.stateUser.isAuthenticated])
  );

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      console.log(context.stateUser,'##########################')
      props.navigation.navigate("Table");
    }
  }, [context.stateUser.isAuthenticated])
  


  useEffect(() => {
    if(props.errors) {
      setEmailError(props.errors)
    }
  }, [props.errors])

  const handleSubmit = () => {
    setEmailError('')
    setError('')

    const user = {
      email,
      password,
    };
    console.log(context,'cccccontext')
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
        if(isSelected) {
          AsyncStorage.setItem("savedEmail", email)
        }
        console.log('success',{email,password})

      loginUser(user, context.dispatch,axios);
    }
  };

 const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}))
}

 const setCurrentUser = (decoded, user) => {
  return {
      type: SET_CURRENT_USER,
      payload: decoded,
      userProfile: user
  }
}
  return ( 
    <FormContainer >
      <Image style={styles.imageStyle} source={require('../../assets/Icoder.jpg')} />
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={AsyncStorage.getItem('savedEmail') ? AsyncStorage.getItem('savedEmail') : email}
        border = {emailerror.email ? styles.redBorder : ""}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      {emailerror.email ? <Error message={emailerror.email} /> : null}
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        // value={password}
        onChangeText={(text) => setPassword(text)}
        border = {emailerror.password ? styles.redBorder : ""}
      />
      {emailerror.password ? <Error message={emailerror.password } />: null }

      {/* <View style={[{display:'flex',flexDirection:'row'},styles.mb]}>
      <CheckBox
          value={isSelected}
          onValueChange={() => setSelection(true)}
          style={styles.checkbox}
        />
        <Text>Remember me</Text>
      </View> */}
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
          <EasyButton  
            large
            primary
          onPress={() => handleSubmit()}>
            <Text style={{ color: "white" ,fontSize: 18}}>Login</Text>
          </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  redBorder: {
    borderColor: 'red',
  },
  normalBorder: {
    borderColor: 'green'
  },
  imageStyle: {
    marginBottom: 40
  },
  checkbox: {
    marginRight: 10,
  },
  mb: {
    marginBottom: 15
  }
});


const mapStateToProps = (state) => ({
  errors: state.errorReducer,
  cartItems:state.cartItems
});
export default connect(mapStateToProps )(ErrorHandler(Login,axios));
