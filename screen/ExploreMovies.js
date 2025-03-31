import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { globalStyles } from "../global/global";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../shared/Header";
import { TMDB_API_KEY } from "@env";

// Function to shuffle an array
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export default function ExploreMovies({ navigation }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const randomPage = Math.floor(Math.random() * 500) + 1; // Random page from 1 to 500
            const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
                params: {
                    api_key: TMDB_API_KEY,
                    sort_by: "popularity.desc",
                    page: randomPage,
                },
            });

            const shuffledData = shuffleArray(response.data.results); // Shuffle results
            setData((prevData) => [...prevData, ...shuffledData]); // Append shuffled data
            setPage(randomPage); // Store the last fetched page
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(); // Fetch randomized movies on first load
    }, []);

    // Load more when user reaches the end
    const loadMore = () => {
        if (!loading) {
            fetchMovies(); // Fetch a new random page
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header title={"Explore Movies"} navigation={navigation} />
            <FlatList
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Review", { item })}>
                        <View style={styles.container}>
                            <ImageBackground
                                style={styles.images}
                                resizeMode="contain"
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            />
                            <Text>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                onEndReached={loadMore} // Triggers when near the end
                onEndReachedThreshold={0.5} // Adjust sensitivity
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Loading indicator
            />
        </View>
    );
}

const styles = StyleSheet.create({
    images: {
        height: 300,
        width: 150,
    },
    container: {
        width: 150,
        marginRight: 10,
        paddingLeft: 30,
    },
    title: {
        paddingHorizontal: 30,
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
});
