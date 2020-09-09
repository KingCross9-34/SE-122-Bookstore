/**
 * Created by lpp on 2020/3/14.
 */
import * as React from 'react';
import {
    //AsyncStorage,
    View,
    Text,
    Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export function  Profile({navigation}){
    return(<View>
        <Text>My Profile</Text>
        <Button title="退出账户" onPress={() => {
            AsyncStorage.removeItem("@Bookstore:token");
            navigation.navigate("Login")
        }}/>
    </View>);
}
