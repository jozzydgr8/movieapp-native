import { useContextData } from "../contxt/UseContextData";
import { FlatList, View, Text, StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import { globalStyles } from "../global/global";
import { HeaderPoster } from "./components/HeaderPoster";
import Header from '../shared/Header'


export function Home({navigation}){
    const {data} = useContextData();

    return(
        <>
        <Header title={'Moviebox'} navigation={navigation}/>
        <View style={globalStyles.container}>
            
        

            <FlatList
            ListHeaderComponent={<View>
                <HeaderPoster identifier={129}/>
                <Text style={styles.title}>Featured Movies</Text>
            </View>}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            data={data}
           
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>navigation.navigate('Review', {item:item})}>
                    <View style={styles.container}>
                   
                   <ImageBackground
                   style={styles.images}
                   resizeMode="contain"
                    source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}>

                   </ImageBackground>
               
                    <Text>{item.title}</Text>
                    </View>
                </TouchableOpacity>
                
            )}
            />
        
        
        </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    images:{
        height:300,
        width:150,
    },
    container:{
        width:150,
        marginRight:10,
        paddingLeft:30,
    },
    title:{
        paddingHorizontal:30,
        marginTop:20,
        fontSize:18,
        fontWeight:'bold'
    }
})