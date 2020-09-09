/**
 * Created by lpp on 2020/3/14.
 */
import React from 'react';
import {Button, View,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Profile} from '../components/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import {BookScreen} from './BookScreen';
import {BookListScreen} from "./BookListScreen"
import {MyCartScreen} from './MyCartScreen';
import {OrderinfoScreen} from './OrderinfoScreen';
import { SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();
function BookListAndDetail(){
    return (
        <SafeAreaProvider>
        <Stack.Navigator>
            <Stack.Screen name="BookList" component={BookListScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Detail" component={BookScreen}/>
        </Stack.Navigator>
            </SafeAreaProvider>
    );
}
function CartScreen({navigation}) {
    //console.log("cartscreen", userid)
    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <MyCartScreen navigation={navigation}/>
        // </View>
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={MyCartScreen}/>
            <Stack.Screen name="Orderinfo" component={OrderinfoScreen}/>
        </Stack.Navigator>
    );
}

function MyOrderScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Order</Text>
        </View>
    );
}

function LogoutScreen({navigation}) {
    // AsyncStorage.removeItem("@user");
    // navigation.navigate("Login")
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Profile navigation={navigation}/>
        </View>
    );
}

const Drawer = createDrawerNavigator();
export class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {id: null}
        }
    }

    componentDidMount() {
        const Async = async () => {
            try {
                var user = await AsyncStorage.getItem("@user")
                //console.log("users", user)
            }
            catch (e) {

            }
            this.setState({user: JSON.parse(user)})
        }
        Async();
    }

    render() {
        console.log("home")
        console.log("user", this.state.user.id);
        const userid = this.state.user.id
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Books" component={BookListAndDetail} />
                <Drawer.Screen name="MyCart" component={CartScreen}/>
                <Drawer.Screen name="MyOrder" component={MyOrderScreen} />
                <Drawer.Screen name="Logout" component={LogoutScreen} />
            </Drawer.Navigator>
        );
    }

}
