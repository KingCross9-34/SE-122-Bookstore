/**
 * Created by lpp on 2020/3/13.
 */
import React,{useState} from 'react';
import {
    //AsyncStorage,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    Button,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {apiUrl} from "../urlconfig";
// 获取屏幕的宽和高
let {width,height} = Dimensions.get('window');
const LOGIN_URL=apiUrl+"/login";
var isSuccess ;
function fetchData({username,password,navigation}) {
    console.log("fetch")
    fetch("http://192.168.0.109:8080/login",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username":username,
            "password":password,
        }),
    })
        .then((response) => {
            // let cookie=response._bodyBlob._data.blobId;
            // console.log("cookie in login screen:"+JSON.stringify(response));
            // let _storeData = async () => {
            //     try {
            //         await AsyncStorage.setItem("@Bookstore:token",'exist');
            //     } catch (error) {
            //         // Error saving data
            //     }
            // };
            // _storeData();
            return response.json();
        })
        .then((responseData) => {
            // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
            console.log(responseData);
            isSuccess=(responseData.status === 0);
            if(isSuccess){
                let _storeData = async () => {
                        try {
                            await AsyncStorage.setItem("@user", JSON.stringify(responseData.data))
                        } catch (error) {
                            // Error saving data
                        }
                    };
                _storeData()
                navigation.navigate("Home", {id: responseData.data.id})
            }else{
                Alert.alert(responseData.msg);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
}
export function LoginScreen({navigation}){
    const [username, setName] = useState('');
    const [password,setPassword]=useState('');
    return (
            <View style={{ flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.titleStyle}>Login</Text>
                    {/*账号和密码*/}
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => setName(text)}
                        value={username}
                        placeholder={'请输入用户名'} />

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='请输入密码'
                        onChangeText={text => setPassword(text)}
                        value={password}
                        password={true}/>

                    {/*登录*/}
                    <Button style={styles.loginBtnStyle} title="登录" onPress={() => {
                        fetchData({username,password,navigation});
                        //navigation.navigate("Home")
                    }}>
                        <Text style={{color:'white'}}>登录</Text>
                    </Button>

                    {/*设置*/}
                    <View style={styles.settingStyle}>
                        <Text>忘记密码</Text>
                        <Text>注册</Text>
                    </View>

                </View>
            </View>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 侧轴的对齐方式
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: '#add8e6'
    },
    textInputStyle: {
        width:width*0.9,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        marginBottom:5
    },
    loginBtnStyle: {
        width: width*0.9,
        height: 40,
        backgroundColor:'blue',
        marginTop:30,
        marginBottom: 20,
        borderRadius:10
    },
    settingStyle: {
        width: width*0.85,
        height: 40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleStyle: {
        fontSize:40,
        alignItems:'center',
        paddingBottom:10
    },
});
