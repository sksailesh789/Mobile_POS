import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,ScrollView,Image,TextInput} from 'react-native'
import axios from 'axios'
const {width} = Dimensions.get('window')
import Icon from "react-native-vector-icons/FontAwesome"
import baseURL,{imageURL} from "../../assets/common/baseUrl"
import AppLoader from "../AppLoader"
import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorHandler from "../Error/ErrorHandler"


const Products = (props) => {
    const [category,setCategory] = useState(props.route.params.category)
    const [products,setProducts] = useState([])
    const [showProduct,setShowProduct] = useState([])
    const [isloading,setIsloading] = useState(false)
    const [searchPro,setSearchPro] = useState('')

    useEffect(() => {
      console.log('nnnnns')
      SearchHandler()
    }, [searchPro]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('jwt');
          const response = await axios.get(`${baseURL}product/category/${category}`, {
            headers: { Authorization: token },
          });
          setProducts(response.data)
          setShowProduct(response.data)
          setIsloading(false);
        } catch (error) {
          setIsloading(false);
        }
      };
  
      fetchData();
    }, []);

    const SearchHandler = () => {
      const abc = products.filter(pro => pro.name.toLowerCase().includes(searchPro.toLowerCase()) )
      setShowProduct(abc)
      
    }
    
    
  const  handleClick = (pro) => {
    
    props.navigation.navigate("ProductItemDetail" , {product : pro})

    // console.log(categ.children.length ,'cccc')
}
  return (
    // <View style={styles.productview}>
    //   {products.map(product => (
    //    < TouchableOpacity onPress={() => handleClick(product)}>
    //     <View>
    //       <Text>{product.name}</Text>
    //     </View>
    //   </TouchableOpacity>
    // ))}
    // </View>
    <>
        {isloading ? <AppLoader /> : (
            <ScrollView nestedScrollEnabled={true} style={{ 
              height:Dimensions.get('screen').height,
              backgroundColor:"#b8b8b8"
              }}>
                 <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:10,marginTop:30,}}>
                  <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <TextInput
                        style={styles.input}
                        onChangeText = { 
                           (text) => {
                             setSearchPro(text)
                            }
                          // (text) => setSearchCat(text)
                        }
                        value={searchPro}
                        placeholder="Search..."
                        keyboardType="default"
                        placeholderTextColor="#3d912f"
                      />
                      <TouchableOpacity onPress={ SearchHandler}>
                        <View style={{backgroundColor:'#2f6626',padding:11,marginTop:2.7}}>
                          <Icon 
                              name="search"
                              style={{position:"relative"}}
                              color= "#fff"
                              size= {17}
                            />
                        </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => {
                        setSearchPro('')
                        SearchHandler()}
                        }>
                        <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',padding:10,backgroundColor:'red'}}>
                          <Text style={{color:'white',fontWeight:'500',fontSize:15}}>Close </Text>
                          <Icon 
                                name="remove"
                                style={{position:"relative"}}
                                color= "#fff"
                                size= {20}
                              />
                        </View>
                        
                      </TouchableOpacity>
                  </View>
                    
                    
                </View>
                <View style={styles.catWrapView}>
                    {showProduct.map(pro => {
                      console.log(pro,'jjjjjjjjjjjjjjjj')
                        return (
                      
                          <View style={styles.catview} key={pro._id}>
                            <TouchableOpacity 
                                onPress= {() => handleClick(pro)}
                              style={{backgroundColor:'red',margin:10}} > 
                                  <Image 
                                    style= {styles.image}
                                    resizeMode= "cover"
                                    source= {{uri : `${imageURL}${pro.image}` ? `${imageURL}${pro.image}` : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
                                      <Text style={{textAlign:'center',color:'white'}}>{pro.name}</Text>
                            </TouchableOpacity>
        
                          </View>
                        )
                    })}
                </View>
            </ScrollView>
        )}
    </>
    
  )
}

const styles = StyleSheet.create({
  catview: {
    width: width/2,
    alignItems: "center",
    backgroundColor:"#fff",
    // margin: 5,
    // padding:30
  },
  image: {
    width: width/2.05,
    height: width / 2,
    backgroundColor: 'transparent',
    // position: 'absolute',
    // top: -45
},
  catWrapView: {
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#b8b8b8'
},
input:{
  height: 40,
  width:width/2.5,
  margin: 2,
  borderWidth: 2,
  padding: 10,
  borderColor:'#3d912f',
  backgroundColor:'#fff',

}
})
export default ErrorHandler(Products,axios) 