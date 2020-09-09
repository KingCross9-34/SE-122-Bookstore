/**
 * Created by lpp on 2020/3/14.
 */
import React from 'react';
import {View,Text,Image,StyleSheet,DeviceEventEmitter, Button, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export class OrderinfoScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: null
        }
    }

    renderOrderitems = ({item}) => {
        return (
            <View>
                <Text>{item.book.bookname} * {item.num}本</Text>
            </View>
        )
    }

    render() {
        let userid = this.props.route.params.userid
        let orderinfo = this.props.route.params.orderinfo;
        const orderitem = orderinfo.orderitem
        DeviceEventEmitter.emit("add", userid)
        console.log(orderitem)
        return (
            <View style={styles.container}>
                <SafeAreaView>

                    <View >
                        <Text style={styles.name}>This is your order information:</Text>
                    </View>
                    <View style={styles.text}>
                        <Text>OrderID：{orderinfo.orderid}</Text>
                        <Text>Totals：¥{orderinfo.totals/100}</Text>
                        <Text>Time：{orderinfo.ordertime}</Text>
                    </View>
                    <FlatList
                        data={orderinfo.orderitem}
                        renderItem={this.renderOrderitems}
                        style={styles.list}
                        />
                </SafeAreaView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    name:{
        fontSize:20,
        alignSelf: "center",
        marginTop: 150
    },
    text:{
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        alignSelf: 'center'
    }
});
