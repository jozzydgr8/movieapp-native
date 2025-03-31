import { StyleSheet,View  } from "react-native"
import { Ionicons } from "@expo/vector-icons";
export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    }
})



export function StarRating({ rating }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={24}
          color="gold"
        />
      ))}
    </View>
  );
}


