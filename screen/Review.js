import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { HeaderPoster } from "./components/HeaderPoster";
import { globalStyles } from "../global/global";
import { StarRating } from "../global/global";

export default function Review ({navigation, route}){
    const {item} = route.params;
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:item.title,
      
        })
    },[navigation,item]);

    return(

        <View style={globalStyles.container}>
        <ScrollView>
            
            <HeaderPoster identifier={item.id}/>

            <View style={styles.items}>
            <Text style={styles.title}>
                {item.title}
            </Text>
            <Text>{item.overview}</Text>
            
            </View>

            <View style={styles.rating}>
            <View>
            <Text>Ratings:</Text>
            <StarRating rating={item.vote_average}/>
            </View>
            <Text>Release Date: {item.release_date}</Text>
            
            <Text>Movie Popularity: {item.popularity}</Text>
            </View>
        
        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:16.
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
      
    },
    items:{
        flex:1,
        gap:10,
        padding:16,
        backgroundColor:'#ffff'
    },
    rating:{
        borderColor:'black',
        borderTopWidth:1,
        marginHorizontal:16,
        paddingTop:10,
        gap:10
    }
})