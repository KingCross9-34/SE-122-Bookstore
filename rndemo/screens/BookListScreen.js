/**
 * Created by lpp on 2020/3/29.
 */
import React from 'react';
import {View,Text,ActivityIndicator, FlatList, Image,StyleSheet,TouchableHighlight} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import {SearchBar} from '../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    author: {
        fontSize:10,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingRight:10,
    },
    image: {
        width: 53,
        height: 81
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#F5FCFF',
    },
});

const GETBOOKS_URL=apiUrl+"/getbooks";
export class BookListScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            userid: null,
            books:[],
            showBooks:[],
            isLoading: true,
        }
    }

    componentDidMount(){
        const _retrieveData = async () => {
            try {
                var user = await AsyncStorage.getItem('@user');
                if (user !== null) {
                    // We have data!!
                    this.fetchData();
                }
            } catch (error) {
                // Error retrieving data
            }
            this.setState({userid: JSON.parse(user).id})
        }
        _retrieveData();
    }

    fetchData() {
        fetch(GETBOOKS_URL, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "search": 'null',
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    isLoading:false,
                    books: responseData,
                    showBooks:responseData
                });
            })
            .catch((error)=> {
                console.error(error);
            });
    }

    getText(data) {
        var arr=[];
        var list=this.state.books;
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.indexOf(data) >= 0||
                list[i].type.indexOf(data) >= 0||
                list[i].author.indexOf(data) >= 0||list[i].description.indexOf(data) >= 0) {
                arr.push(list[i])
            }
        }
        this.setState({
            showBooks:arr
        })
    }

    navigateToDetail({item}){
        this.props.navigation.push("Detail",{detail:item, userid: this.state.userid});
    }

    renderBook=({ item })=>{
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <TouchableHighlight onPress={()=>{this.navigateToDetail({item});}} >
                <View style={styles.container}>
                    <Image
                        source={{uri: item.image}}
                        style={styles.image}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.bookname}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                    <View >
                        <Text>¥{item.price/100}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    cancel(){
        this.setState({
            showBooks:this.state.books
        });
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
                <SearchBar searchBooks={(data) => this.getText(data)} cancelSearching={()=>this.cancel()}/>
                <FlatList
                    data={this.state.showBooks}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }
}
