import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,ScrollView,StyleSheet,Dimensions, Alert, Modal,Pressable} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import {connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import io from "socket.io-client"
import baseURL,{imageURL} from "../../assets/common/baseUrl"
import AppLoader from "../AppLoader"
import ErrorHandler from "../Error/ErrorHandler"

const {width} = Dimensions.get('window')

 const OrderConfirm = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [products,setProducts] = useState([])
    const [price,setPrice] = useState('')
    const [isloading , setIsloading] = useState(false)

    let orderItems = []
    let total ;
    useEffect(() => {
      props.cartItems.map(p => {
            orderItems.push({
                name: p.product.name,
                qty: p.quantity,
                price: p.product.price,
                product: p.product._id
            })
      })
      total =  orderItems.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price  * currentValue.qty)
    }, 0)
    setPrice(total)
    //    return orderItems;
     
    }, [props.cartItems])

    const confirmOrderHandler = async () => {
    //    const socket = io('http://192.168.1.2:5005/')

        let orderItem = [];
        if (props.cartItems.length < 1) {
          return;
        }
    
        props.cartItems.map((p) => {
          orderItem.push({
            name: p.product.name,
            qty: p.quantity,
            price: p.product.price,
            product: p.product._id,
          });
        });
        let table = props.tableReducer.name;
        setIsloading(true);
    
        try {
          const token = await AsyncStorage.getItem('jwt');

          const response = await axios.post(`${baseURL}order`, {
            totalprice: price,
            orderItems: orderItem,
            table: props.tableReducer._id,
            token
          });
          setIsloading(false);
    
        //   socket.emit('order_confirmed', { orderItem, table }, function (data) {
        //     console.log('datatesttt');
        //   });
    
          setOrderSuccess(true);
    
          const response2 = await axios.post(`${baseURL}table`, {
            _id: props.tableReducer._id,
            name: props.tableReducer.name,
            color: 'red',
            ordersList: orderItem,
            token,
          });
          setPrice(0);
          props.clearCart();
        } catch (error) {
          console.log(error, 'err');
          setIsloading(false);
        }
      };
    
   
    const deleteHandler = (data) => {
        props.deleteCart(data)
    }
    const addItemHandler = () => {
        props.navigation.navigate("Category")
    }
    const goToTableHandler = () => {
        props.navigation.navigate("Table")
    }

  return (
    <ScrollView nestedScrollEnabled={true} style={{ 
        height:Dimensions.get('screen').height,
        }}>
        <View style={{padding: 10,width:width}}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
               
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {orderSuccess ? (
                        <View>
                            <Text style={{fontSize: 20, textTransform:'capitalize',marginBottom: 10}}>order completed sucessfully</Text>
                            <Pressable
                                style={[styles.button, styles.buttonYes,{marginBottom:5}]}
                                onPress={() => setModalVisible(!modalVisible)} >
                                <Text style={styles.textStyle}>close</Text>
                            </Pressable>
                            <Pressable
                            style={[styles.button, styles.buttonNo]}
                            onPress={goToTableHandler}
                            >
                                <Text style={styles.textStyle}>GO TO Table</Text>
                            </Pressable>
                        </View>
                    ): (
                        <View>
                        <Text style={styles.modalText}>Are you sure want to order ?</Text>
                        <View style={styles.orderHead}>
                            <Pressable
                            style={[styles.button, styles.buttonYes]}
                            onPress={() => confirmOrderHandler()}
                            >   
                                <View >
                                    <Text style={styles.textStyle}>Yes</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonNo]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View >
                                    <Text style={styles.textStyle}>No</Text>
                                </View>
                            </Pressable>
                        </View>
                        </View>
                    
                    )}
                </View>
                </View>
            </Modal>
            {isloading ? <AppLoader /> : (<Text> </Text>)}
        <Text style={{textAlign:'center',fontSize:25,fontWeight:"600",marginBottom: 30}}>Table : {props.tableReducer.name}</Text>
        <View style={[styles.orderHead, {marginBottom:20}]}>
            <Text style={{fontSize:20,fontWeight:'500'}}>OrderLists</Text>
            <TouchableOpacity style={styles.orderHead} onPress={addItemHandler}> 
                <View style={[styles.orderHead , {backgroundColor:'red',padding:5}]}>
                    <Icon 
                        name="plus"
                        style={{position:"relative"}}
                        color= "#fff"
                        size= {20}
                                />
                    <Text style={{color:'white',fontSize:15,fontWeight:'500',textTransform:'uppercase'}}> Add Item</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={[styles.orderHead,{marginBottom:15}]}>
            <Text style={styles.listHead}>Item</Text>
            <Text style={styles.listHead}>Quantity</Text>
            <Text style={styles.listHead}>Price</Text>
            <Text style={styles.listHead}> </Text>

        </View>
        {props.cartItems.map(data => {
            console.log(data,'d55')
            return (
                <View key={data.product._id} style={[styles.orderHead, {paddingBottom:5,marginBottom : 12,borderBottomColor:'#f0670c',borderBottomWidth:1}]}>
                    <Text style={styles.listText}>{data.product.name}</Text>
                    <Text style={styles.listText}>{data.quantity}</Text>
                    <Text style={styles.listText}>{data.product.price}</Text>
                    <TouchableOpacity onPress={() => deleteHandler(data.product._id)}>
                        <Icon 
                            name="remove"
                            style={{position:"relative"}}
                            color= "#000"
                            size= {20}
                                    />
                    </TouchableOpacity>
                </View>
            )
        })}
        <View style={{padding:15,flexDirection:'row-reverse'}}>
            <Text style={{fontSize:25,fontWeight:'700'}}>Total : Rs {price}</Text>
        </View>
        <View >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
                <View style={{ padding: 10 , backgroundColor:'blue'}}>
                    <Text style={{fontSize:14,fontWeight: '600',color:'white',textTransform:'uppercase',textAlign:'center'}}> Confirm Order </Text>
                </View>
                
            </TouchableOpacity>
            
        </View>
        {/* <View style={styles.orderHead}>
            <Text>Chicken momo</Text>
            <Text>2</Text>
            <Text>200</Text>
        </View> */}

            
    </View>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
    const {cartItems,tableReducer} = state;
    return {
        cartItems: cartItems,
        tableReducer:tableReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearCart : () => dispatch(actions.clearCart()),
        deleteCart : (d) => dispatch(actions.removeFromCart(d))
    }
}

const styles = StyleSheet.create({
    orderHead: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    listHead:{
        fontSize: 16,
        fontWeight:'600',
        textTransform: 'capitalize'
    },
    listText:{
        fontSize: 15,
        fontWeight:'600',
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 3,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonYes: {
        backgroundColor: "#156e35",
      },
      buttonNo: {
        backgroundColor: "#b00c1d",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        fontSize: 15,
        fontWeight: '500',
        textAlign: "center"
      }
})

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(OrderConfirm,axios));
