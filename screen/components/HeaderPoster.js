import { ImageBackground, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { TMDB_API_KEY } from '@env';


export function HeaderPoster({ identifier }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Prevent state updates if unmounted

        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${identifier}`, {
                    params: { api_key: TMDB_API_KEY},
                });
                if (isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load movie.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMovie();

        return () => { isMounted = false; }; // Cleanup on unmount
    }, [identifier]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    if (error) return <Text style={styles.error}>{error}</Text>;
    if (!data || !data.poster_path) return <Text style={styles.error}>No poster available</Text>;

    return (
        <View>
            <ImageBackground
                resizeMode="cover"
                style={styles.container}
                source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 600,
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        marginTop: 20,
    },
    error: {
        textAlign: "center",
        color: "red",
        fontSize: 16,
        marginTop: 20,
    },
});
