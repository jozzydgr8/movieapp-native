import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { globalStyles } from "../global/global";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../shared/Header";

export default function ExploreMovies({ navigation }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async (pageNumber) => {
        if (loading) return; // Prevent multiple API calls at once

        setLoading(true);
        try {
            const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
                params: {
                    api_key: "89707361b16946b90801886bc1f0622c",
                    sort_by: "popularity.desc",
                    page: pageNumber,
                },
            });

            setData((prevData) => [...prevData, ...response.data.results]); // Append new data
            setPage(pageNumber); // Update page number
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(1); // Load the first page initially
    }, []);

    // Function to load more data when reaching the end
    const loadMore = () => {
        if (!loading) {
            fetchMovies(page + 1); // Load next page
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header title={"Explore Movies"} />
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
                onEndReachedThreshold={0.5} // Adjusts sensitivity of onEndReached
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Loading indicator at bottom
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
