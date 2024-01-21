import React, {useEffect,useState} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Button} from 'react-native'
import axios from 'axios'
import Icon from "react-native-vector-icons/FontAwesome"
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message'
import ErrorHandler from "../Error/ErrorHandler"

const ProductItemDetail = (props) => {

  // const [product,setProduct] = useState('')
  const [product,setProduct] = useState(props.route.params.product)
  const [count,setCount] = useState(1)

  // useEffect(() => {
  //   console.log(product,'pppppppppppppppp')
    
  //   axios
  //   .get('http://192.168.1.74:5000/api/product/62a310b3ab6107276de12423')
  //   .then((data) => {
  //        console.log(data.data,'datac5555')
  //        setProduct(data.data)
        
  //  })
  //  .catch((err) => {
  //       console.log(err,'rrr')
         
  //    });
    
  // }, [])
  const incrementCount = () => {
    if(count >= 5) {
      console.log('sry')
    }else{
      setCount(count + 1)
    }
  }
  const decrementCount = () => {
    if(count <= 1) {
      console.log('sry')
    }else {
      setCount(count - 1)
    }
  }

  return (
    // <TouchableOpacity>
    <React.Fragment>
        <View style={{padding: 20}}>
          <View style={{display: 'flex',alignContent:'center',flexDirection:'row'}}>
            <Text style= {{alignSelf:'center',textAlign:'center',fontSize:30,textTransform:'uppercase',color:'blue',fontWeight:'500'}}> Add Item</Text>
          </View>
            <View style= {styles.viewItem}>
              <Text style={{fontSize:20,textTransform:'uppercase',fontWeight:'500'}}>Item :</Text>
              <Text style={{fontSize:20,textTransform:'uppercase',fontWeight:'500'}}>{product.name}</Text>
            </View>
            <View style= {styles.viewItem}>
              <Text style={{fontSize:20,textTransform:'uppercase',fontWeight:'500'}}>Quantity :</Text>
              <View style={{display:'flex',flexDirection:'row'}}>
                <TouchableOpacity onPress={() => incrementCount()}>
                  <View style={{backgroundColor:'gray',padding:8}}>
                    <Icon 
                        name="plus"
                        style={{position:"relative"}}
                        // color= {color}
                        size= {20}
                          />
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize: 25}}> {count} </Text>
                <TouchableOpacity onPress={() => decrementCount()}>
                  <View style={{backgroundColor:'gray',padding:8}}>
                    <Icon 
                              name="minus"
                              style={{position:"relative"}}
                              // color= {color}
                              size= {20}
                          />
                  </View>
                  
                </TouchableOpacity>

              </View>
              

            </View>
            <View style= {styles.viewItem}>
              <Text style={{fontSize:20,textTransform:'uppercase',fontWeight:'500'}}>Price :</Text>
              <Text style={{fontSize:20,textTransform:'uppercase',fontWeight:'500'}}>Rs. {product.price}</Text>

            </View>
           

        </View>
        <View  style={styles.viewButton}>
          <TouchableOpacity onPress={() => { props.navigation.goBack()}}>
            <View style={styles.viewButtonWrap}>
              <Icon 
                name="chevron-left"
                style={{position:"relative",color:'#fff',marginRight: 5}}
                size= {25}
                         />
                <Text style={{color:'#fff',fontSize: 15,fontWeight:'500'}}>Back</Text>
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity 
        onPress={() => props.navigation.navigate("OrderConfirm")}

          // onPress={() => {props.navigation.navigate("Category")}}
          >
            <View style={[styles.viewButtonWrap,{backgroundColor: 'blue'}]}>
              <Icon 
                name="plus"
                style={{position:"relative",color:'#fff',marginRight: 5}}
                size= {25}
                            />
                <Text style={{color:'#fff',fontSize: 15}}>Next</Text>
            </View>
           
          </TouchableOpacity>
          <TouchableOpacity 
          onPress= {() => {props.addItemToCart(product,count),
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: `item added to Cart`,
              text2: "Go to your cart to complete order"
          })
          }} >
            <View style={[styles.viewButtonWrap, styles.bg_green]}>
              <Icon 
                name="check-circle"
                style={{position:"relative",color:'#fff',marginRight: 5}}
                size= {25}
                            />
                <Text style={{color:'#fff',fontSize: 15}}>ADD TO CART</Text>
            </View>
            
          </TouchableOpacity>
        </View>
    {/* </TouchableOpacity> */}
    </React.Fragment>
  )
}

const mapToDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product,quantity) => 
     { console.log(product,'proooooooduct')
          dispatch(actions.addToCart({quantity: quantity, product}))}
  }
}
const styles = StyleSheet.create({
  viewItem : {
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    marginBottom:10
  },
  viewButton : {
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal: 20
  },
  viewButtonWrap : {
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor:'gray',
    padding:10,
    color:'#fff'
  },
  bg_green : {
    backgroundColor: 'green'
  }
})
export default connect(null,mapToDispatchToProps) (ErrorHandler ( ProductItemDetail,axios))