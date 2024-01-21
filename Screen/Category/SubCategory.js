import React, {useState,useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,ScrollView,Image,TextInput} from "react-native"
const {width} = Dimensions.get('window')
import Icon from "react-native-vector-icons/FontAwesome"
import baseURL,{imageURL} from "../../assets/common/baseUrl"
import ErrorHandler from "../Error/ErrorHandler"
import axios from "axios"

const SubCategory = (props) => {
  const [items, setItems] = useState(props.route.params.items)
  const [showCategory, setShowCategory] = useState(props.route.params.items)


  const [searchCat,setSearchCat] = useState('')


    useEffect(() => {
      SearchHandler()
    }, [searchCat]);

    const SearchHandler = () => {
      console.log(items,'cateee')
      const abc = items.filter(cat => cat.name.toLowerCase().includes(searchCat.toLowerCase()) )
      setShowCategory(abc)
      
    }
  const  handleClick = (categ) => {
    if(categ.children && categ.children.length > 0) {
        props.navigation.navigate("Sub2Category" , {items : categ.children})
    }
    console.log('first')
    props.navigation.navigate("Products" , {category : categ._id})

    // console.log(categ.children.length ,'cccc')
}
  return (
    <ScrollView nestedScrollEnabled={true} style={{ 
      height:Dimensions.get('screen').height,
      backgroundColor:"#b8b8b8"
      }}>
        <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:10,marginTop:30}}>
          <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
            <TextInput
                style={styles.input}
                onChangeText = { 
                   (text) => {
                     setSearchCat(text)
                    }
                  // (text) => setSearchCat(text)
                }
                value={searchCat}
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
                setSearchCat('')
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
            {showCategory.map(categ => {
              console.log(categ,'jjjjjjjjjjjjjjjj')
                return (
              
                  <View style={styles.catview} key={categ._id}>
                    <TouchableOpacity 
                        onPress= {() => handleClick(categ)}
                      style={{backgroundColor:'red',margin:10}} > 
                          <Image 
                            style= {styles.image}
                            resizeMode= "cover"
                            source= {{uri : `${imageURL}${categ.image}` ? `${imageURL}${categ.image}` : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
                          <Text style={{textAlign:'center',color:'white'}}>{categ.name}</Text>

                    </TouchableOpacity>

                  </View>
                )
            })}
        </View>
    </ScrollView>
    
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
    
  });
export default ErrorHandler(SubCategory,axios) 