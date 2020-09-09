/**
 * Created by lpp on 2020/3/29.
 */
import React from 'react';
import {
    ActivityIndicator,
    //AsyncStorage,
    Button,
    DeviceEventEmitter,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from 'react-native-check-box';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment/moment'
import {apiUrl} from '../urlconfig';

let {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: "#F5FCFF",
        width: width
    },
    book: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize:14,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    price: {
        paddingRight: 25,
    },
    image: {
        marginLeft: 20,
        width: 53,
        height: 81
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#F5FCFF',
    },
    buttonarea: {
        flexDirection: 'row',
        width: width
    },
    button: {
        width: width/2,
        //borderRadius: 10,
    }
});

const GETCARTS_URL=apiUrl+"/getcart";
const REMOVE_URL = apiUrl+"/removecart";
const BUY_URL = apiUrl+"/order"
export class MyCartScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            userid: null,
            carts:[],
            showCarts:[],
            isLoading: true,
            choosedCarts: []
        }
    }

    componentDidMount(){
        const that = this;
        this.listener = DeviceEventEmitter.addListener("add", (userid) => {
            that.fetchData(userid)
        })
        if (!this.state.userid) {
            //this.fetchData(this.state.userid)
            const _retrieveData = async () => {
                try {
                    var user = await AsyncStorage.getItem('@user');
                    if (user !== null) {
                        // We have data!!
                        console.log("async userid", JSON.parse(user).id)
                        this.setState({userid: JSON.parse(user).id})

                        this.fetchData(JSON.parse(user).id);
                    }
                } catch (error) {
                    // Error retrieving data
                }
            }
            _retrieveData();
        }

    }

    componentWillUnmount() {
        //this.setState({choosedCarts: []})
        this.listener.remove()
    }

    fetchData(userid) {
        console.log("fetch")
        var that = this
        fetch(GETCARTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userid),
        })
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                console.log("fetch cart")
                console.log("length",responseData.length)
                that.setState({
                    isLoading:false,
                    carts: responseData,
                    showCarts:responseData,
                    choosedCarts: []
                });
            })
            .catch((error)=> {
                console.error(error);
            });
    }

    remove = () => {
        //console.log("remove", this.state.userid, this.state.choosedCarts)
        let data = {"userid": this.state.userid, "removeCartItem": this.state.choosedCarts}
        console.log(data)
        fetch(REMOVE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("after remove")
                this.fetchData(this.state.userid)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    buy = () => {
        let time = moment().format("YYYY-MM-DD HH:mm:ss");
        let data = {"userid": this.state.userid, "orders": this.state.choosedCarts, "time": time};

        console.log(data)
        fetch(BUY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    console.log(data.data)
                    this.props.navigation.push("Orderinfo", {orderinfo: data.data, userid: this.state.userid})
                }
                else {
                    alert(data.msg)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    choose = (cartid) => {
        let newcart = this.state.choosedCarts;
        if (newcart.indexOf(cartid) > -1) {
            newcart.splice(newcart.indexOf(cartid), 1);
        }
        else {
            newcart.push(cartid);
        }
        console.log(newcart)
        this.setState({choosedCarts: newcart});
    }

    ischoosed = (cartid) => {
        //console.log(flag)
        return (this.state.choosedCarts.indexOf(cartid) > -1)
    }

    renderBook=({ item })=>{
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <View style={styles.container}>
                <View>
                    <CheckBox onClick={() => this.choose(item.id)} isChecked={this.ischoosed(item.id)} checkedCheckBoxColor="green"/>
                </View>

                <View style={styles.book}>
                    <Image
                        source={{uri: item.book.image}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.book.bookname}</Text>
                        <Text style={styles.author}>{item.num}本</Text>
                    </View>
                    <View style={styles.price}>
                        <Text>¥{item.book.price/100}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 2}}>
                <View style={styles.buttonarea}>
                    <View style={styles.button}>
                        <Button onPress={() => {this.remove()}} title="remove">
                            <Text>Remove</Text>
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => {this.buy()}} title="buy">
                            <Text>Buy</Text>
                        </Button>
                    </View>
                </View>
                <FlatList
                    data={this.state.showCarts}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }
}
