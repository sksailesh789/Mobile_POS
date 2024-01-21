import React, { Fragment ,useEffect,useState,useContext} from 'react'
import {View,Text ,ScrollView,Dimensions,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native'
import axios from "axios"
import {connect} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import io from "socket.io-client"
import * as actions from '../../Redux/Actions/tableActions';
import AppLoader from "../AppLoader"
const {width} = Dimensions.get('window')
import baseURL from "../../assets/common/baseUrl"
import AsyncStorage from '@react-native-async-storage/async-storage'
export const SET_CURRENT_USER = "SET_CURRENT_USER";
import {logoutUser} from "../../Context/actions/Auth.actions.js"
import AuthGlobal from "../../Context/store/AuthGlobal";
import ErrorHandler from "../Error/ErrorHandler"


const Table = (props) => {

    const [table,setTable] = useState([])
    const [isloading , setIsloading] = useState(true)
    const context = useContext(AuthGlobal);

    useFocusEffect(
      React.useCallback(() => {
        console.log(context.stateUser,'clglogin')
        if (context.stateUser.isAuthenticated !== true) {
          console.log('9999')
          props.navigation.navigate("Login");
        }
  
       
      }, [context.stateUser.isAuthenticated])
    );
    // useEffect(() => {
    //   console.log('clglll')
    //   if (context.stateUser.isAuthenticated !== true) {
    //     props.navigation.navigate("Login");
    //   }
    // }, [context.stateUser.isAuthenticated])
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        const response = await axios.get(`${baseURL}table/tablelist`, {
          headers: { Authorization: token },
        });
        console.log(response.data, 'data');
        setTable(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error, 'err');
        setIsloading(false);
      }
    };

    fetchData();
  }, []);
   const selectTableHandler = (table) => {
      props.addTable(table);
      props.navigation.navigate("Category")
    }
    const logoutUser = (dispatch) => {
      console.log('logout',AsyncStorage.getItem('savedEmail'))
      console.log('logout',AsyncStorage.getItem('jwt'))

      AsyncStorage.removeItem("jwt");
      dispatch(setCurrentUser({}))
      console.log('logout',AsyncStorage.getItem('jwt'))

    }

    const setCurrentUser = (decoded, user) => {
      return {
          type: SET_CURRENT_USER,
          payload: decoded,
          userProfile: user
      }
    }
   

  return (
    <Fragment>
        <ScrollView nestedScrollEnabled={true} style={{ 
          height:Dimensions.get('screen').height,
          backgroundColor:"#dcdede"
          }}>
           <View style={styles.ViewtableHeadText}>
            <Text style={styles.tableHeadText}>DINE IN TABLE</Text>
           </View> 
           {isloading ? 
              ( <AppLoader /> ) : (
                  <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',backgroundColor:'#dcdede'}}>
                    {table.map(tab => {
                        console.log(tab.color,'tc')
                        return (
                        <TouchableOpacity 
                          onLongPress={() => logoutUser(context.dispatch)}
                          onPress= {() => selectTableHandler(tab)}
                          key={tab._id}
                        >
                          <View style={[styles.tableview , tab.color == 'green' ? styles.green : styles.red]} >
                            <Text style={styles.tableText}>{tab.name}</Text>
                          </View>
                        </TouchableOpacity>
                      )})} 
                </View>
           )}
        </ScrollView>
    </Fragment>
   
  )
}

const mapToDispatchToProps = (dispatch) => {
  return {
      addTable: (table) => 
     { 
      console.log(table,'tabble')
          dispatch(actions.addTable(table))}
  }
}
const styles = StyleSheet.create({
  tableview: {
    width: width/2.1,
    alignItems: "center",
    margin: 2,
    padding:30,
    // display:'flex',
    // flexDirection:'row'
  },
  tableText: {
    color: 'white',
    fontSize: 25,
    textAlign:'center'

  },
  tableHeadText: {
    color: '#111212',
    fontSize: 30,
    textAlign: 'center'
  },
  ViewtableHeadText : {
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: '#dcdede',
    padding: 20,
    color: '#fff'
  },
  green:{
    backgroundColor:'green'
  },
  red:{
    backgroundColor:'red'
  }
});

export default connect(null, mapToDispatchToProps)(ErrorHandler(Table,axios))