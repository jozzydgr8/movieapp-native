import { StyleSheet, View,Text,  TouchableWithoutFeedback } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header({navigation, title}){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('Search')}>
            <View>
                <Ionicons name="search" size={24} color={'#fff'}/>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:80,
        backgroundColor:'black',
        justifyContent:'space-around',
        paddingBottom:10,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    text:{
        fontWeight:"bold",
        alignItems:'center',
        color:'white',
        fontSize:24,
        // textAlign:'center'
    }
})

