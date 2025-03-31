import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { Formik } from 'formik';
import { globalStyles } from "../global/global";
import { useState } from "react";
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';
import {TMDB_API_KEY} from '@env'
export default function FindMovies({navigation}){

    const [movies, setMovies] = useState([]);
    const fetchMovies = async (query) => {
        try {
          const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
              api_key: TMDB_API_KEY,
              query: query,
            },
          });
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
    return(
        <View style={globalStyles.container}>
            <Formik
            initialValues={{query:""}}
            >
                {props=>(
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Home')}>
                            <View style={styles.Homeicon}>
                                <Ionicons name="chevron-back" size={24}/>
                                <Text style={styles.Homeicontext}>Home</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TextInput
                            style={styles.input}
                             value={props.values.query} onChangeText={
                            (text)=>{props.handleChange('query')(text)
                            fetchMovies(text)
                            }

                        } placeholder="search any movie...."/>

                  {props.values.query.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  props.setFieldValue("query", "");
                  setMovies([]);
                }}
                style={{
                  position: "absolute",
                  right: 50,
                  top: "50%",
                  transform: [{ translateY: -10 }],
                }}
              >
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
                    )}

                    </View>
                    
                )}
            </Formik>

            <FlatList
            keyExtractor={item=>item.id.toString()}
            data={movies}
            renderItem={({item})=>(
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Review',{item:item})}>
                    <View style={styles.item}>
                    <Text>{item.title}</Text>
                    <Ionicons name="arrow-forward" size={20}/>
                </View>

                </TouchableWithoutFeedback>
                
            )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:60,

        flexDirection:'row',
        
        alignItems:'center',
        gap:15,

    },
     input:{
        borderWidth:1,
        width:250,
        borderColor:'black',
        padding:10,
        paddingRight:50,
        borderRadius:17
    }, 
    buttonContainer:{
        borderWidth:1,
        borderColor:'black'
    },
     Homeicon:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
     },
     Homeicontext:{
        fontSize:20,
     },
     item:{
        padding:13,
        paddingRight:20,
        flexDirection:'row',
        justifyContent:'space-between'
     }
})