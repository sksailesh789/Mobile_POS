import React from 'react'
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Table from '../../Screen/Table/Table'
import Login from '../../Screen/User/Login'
import Category from "../../Screen/Category/Category"
import SubCategory from "../../Screen/Category/SubCategory"
import Sub2Category from "../../Screen/Category/Sub2Category"
import Products from "../../Screen/Product/Products"
import ProductItemDetail from "../../Screen/Product/ProductItemDetail"
import OrderConfirm from "../../Screen/Order/OrderConfirm"
import Error from "../../Screen/Error/Error"







const Stack = createNativeStackNavigator()

function MyStack() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options= {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Table"
                component={Table}
                options= {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Category"
                component={Category}
                options= {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="SubCategory"
                component={SubCategory}
                options= {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Sub2Category"
                component={Sub2Category}
                // options= {{
                //     headerShown: false
                // }}
            />
            <Stack.Screen 
                name="Products"
                component={Products}
                options= {{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="ProductItemDetail"
                component={ProductItemDetail}
                // options= {{
                //     headerShown: false
                // }}
            />
             <Stack.Screen 
                name="OrderConfirm"
                component={OrderConfirm}
                // options= {{
                //     headerShown: false
                // }}
            />
             <Stack.Screen 
                name="Error"
                component={Error}
                // options= {{
                //     headerShown: false
                // }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    ) 
}

export default function HomeNavigator() {
    return <MyStack />
}