
import { useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import axios from 'axios';
import { useContextData } from './contxt/UseContextData';
import { Home } from './screen/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'

import Review from './screen/Review';
import FindMovies from './screen/FindMovies';
import ExploreMovies from './screen/ExploreMovies';

export default function App() {

  const {loading, dispatch} = useContextData();
  useEffect(()=>{
    dispatch({type:'loading', payload:true});

    axios.get('https://api.themoviedb.org/3/movie/top_rated',{
      params: {
          api_key: '89707361b16946b90801886bc1f0622c'  
      }
  }).then(response => {

    // const topMovies = response.data.results.slice(0, 10);
    
    dispatch({type:'getData', payload:response.data.results});
    dispatch({type:'loading', payload:false});
    

})
.catch(error => {
    console.error(error);
})
  },[]);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if(loading){
    <Text>Loading</Text>
  }

  const HomeStack = ()=>{
    return(
      <Stack.Navigator 
  screenOptions={{
    headerStyle: { backgroundColor: 'black' }, 
    headerTintColor: "white", 
  }}
>
  <Stack.Screen 
    name="Home" 
    component={Home} 
    options={{ headerShown: false }} 
  />
  <Stack.Screen 
    name="Review" 
    component={Review} 
    options={{
      headerStyle: { backgroundColor: 'black' }, 
      headerTintColor: "white",
    }} 
  />
  <Stack.Screen 
    name="Search" 
    component={FindMovies} 
    options={{ headerShown: false }} 
  />
</Stack.Navigator>

      
    )
  }

  const ExploreStack = ()=>{
    return(
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: 'black' }, 
          headerTintColor: "white", 
        }}
      >
        <Stack.Screen 
          name="explore" 
          component={ExploreMovies} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Review" 
          component={Review} 
          options={{
            headerStyle: { backgroundColor: 'black' }, 
            headerTintColor: "white",
          }} 
        />
        <Stack.Screen 
          name="Search" 
          component={FindMovies} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    )
  }
  return (
    <>

      


        <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
            tabBarLabelPosition: "below-icon",
            tabBarShowLabel:true,
            tabBarInactiveTintColor:'gray',
            headerShown:false,
            tabBarActiveTintColor:'black'
            }}
        >
            <Tab.Screen name='Home' component={HomeStack}
            options={{
                tabBarLabel:'Movies',
                tabBarIcon: ({color})=><Ionicons name='home' size={30} color={color}/>,
                

            }}/>
            <Tab.Screen name='explore' component={ExploreStack}
            options={{
              tabBarLabel:'Explore',
              tabBarIcon: ({color})=><Ionicons name='film' size={30} color={color}/>,
              tabBarBadge:'',

          }}
            />
        </Tab.Navigator>
       </NavigationContainer>
    </>
    
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
