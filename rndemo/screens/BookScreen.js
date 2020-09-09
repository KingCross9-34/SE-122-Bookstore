/**
 * Created by lpp on 2020/3/14.
 */
import React from 'react';
import {View,Text,Image,StyleSheet,ScrollView, Button, DeviceEventEmitter, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {apiUrl} from '../urlconfig';

const ADDTOCART_URL = apiUrl+"/addcart"

export class BookScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            num: 1
        }
    }

    add = (userid, bookid) => {
        console.log("add", userid, bookid)

        fetch(ADDTOCART_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: userid,
                bookid: bookid,
                num: this.state.num,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("emit")
                DeviceEventEmitter.emit("add", userid)
            })
            .catch((error) => {
                console.log(error)
            })


    }

    render() {
        let detail=this.props.route.params.detail;
        let userid = this.props.route.params.userid;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        source={{uri: detail.image}}
                        style={styles.image}
                    />
                    <View >
                        <Text style={styles.name}>{detail.bookname}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text>作者：{detail.author}</Text>
                        <Text>ISBN：{detail.isbn}</Text>
                        <Text>单价：¥{detail.price/100}</Text>
                        <Text>库存：{detail.stock}</Text>
                    </View>
                    <View style={styles.buttonarea}>
                        <TextInput
                            style={styles.num}
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, '');
                                this.setState({num: newText})
                            }}
                            placeholder="1"
                            value={this.state.num}
                            keyboardType='numeric'
                        />
                        <Button  onPress={() => {this.add(userid, detail.id)}} title="add to cart">
                            <Text>Add to cart</Text>
                        </Button>
                    </View>
                    <View>
                        <Text style={styles.description}>{detail.detail}</Text>
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    name:{
        fontSize:20,
        alignSelf: "center"
    },
    text:{
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        marginTop: 10,
        alignSelf: "center",
        width: 182,
        height: 245,
    },
    buttonarea:{
        marginTop: 10,
        alignSelf: "center",
        flexDirection: 'row'
    },
    num: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 20,
        //marginTop: 5,
        textAlign: 'center'
    },
    description:{
        marginTop: 10,
        paddingLeft:50,
        paddingRight:55
    }
});
