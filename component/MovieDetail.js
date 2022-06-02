import React from 'react';
import { Text, FlatList, StyleSheet, View, TouchableHighlight, Image } from 'react-native';

var movieList = [
    { key: '1', value: 'uwu', thumbnail_url: 'https://reactnative.dev/img/tiny_logo.png' },
    { key: '2', value: 'qaq', thumbnail_url: 'https://reactnative.dev/img/tiny_logo.png' },
    { key: '3', value: '0w0', thumbnail_url: 'https://reactnative.dev/img/tiny_logo.png' }
];



const movieDivider = () => {
    return (
        <View
        style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
        }}
        />
    );
}

const MovieDetailScreen = ({ route, navigation }) => {
    const { movieId, accessToken, refreshToken } = route.params;
    const [searchResult, setSearchResult] = React.useState({"movie" : [], "genres" : [], "persons" : []});
    // addMovie("accessToken", accessToken, "https://reactnative.dev/img/tiny_logo.png");
    // addMovie("refreshToken", refreshToken, "https://reactnative.dev/img/tiny_logo.png");
    const getMovieDetail = async (accessToken, id) => {
        // alert("Email: " + email + ", password: " + password);
        return await fetch('http://10.0.2.2:8082/movie/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken
            },
        })
        .then((response) => response.json() )
        .then((json) => {
            if (json.result.code == 2010) {
                setSearchResult(json);
                //alert("Search Success")
                //navigation.navigate("Search", {accessToken: result.accessToken, refreshToken: result.refreshToken});
            } else {
                alert("Search fail");
            }
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
    };
    React.useEffect(
        ()=> {
            getMovieDetail(accessToken, movieId);
        }, []
    );
    return (
        <View style={styles.container}>
            <View style={styles.container}>

                    <View style={{ display: 'flex', flexDirection:"row" }}>
                        <Image style={styles.thumbnail}
                            source={{
                                uri: "https://image.tmdb.org/t/p/original" + searchResult.movie.posterPath
                                }}/>
                        <Text style={styles.titleText}>
                                {searchResult.movie.title}
                        </Text>
                        <Text  style={{ fontSize: 12}}>
                            {"  " + searchResult.movie.year}
                        </Text>
                    </View>     
                    <View style={styles.subContainer} >
                        <Text style={{ fontSize: 32, margin: 1}}>
                            Director: {searchResult.movie.director}
                        </Text>

                        <View style={{ display: 'flex', flexDirection:"row" }}>
                            <Text style={{ fontSize: 22, margin: 1}}> Genres: </Text>

                            <FlatList
                                horizontal={true}
                                data={searchResult.genres}
                                renderItem={( {item} ) => (
                                                <Text style={{ fontSize: 22, margin: 1}}>
                                                        {item.name},  
                                                </Text>
                                                
                                )}
                            />
                        </View>

                        <Text style={{ fontSize: 20, margin: 1}}>
                            Rating: {searchResult.movie.rating}
                        </Text>

                        <Text style={{ fontSize: 20, margin: 1}}>
                            Number of Votes: {searchResult.movie.numVotes}
                        </Text>
                        
                        <Text style={{ fontSize: 32, margin: 5}}>
                            <Text style={{fontWeight : "bold"}}>Overview:</Text> {searchResult.movie.overview}
                        </Text>

                    </View>
            </View>



            {/* <Text  
                style={styles.titleText}
            >
                "accessToken: {accessToken}" {"\n"}
                "refreshToken: {refreshToken}"
            </Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    subContainer: {
        flex: 1,
    },
    buttonContainer: {
        margin: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    thumbnail: {
        width: 50,
        height: 50,
        margin: 10,
    },
  });

export default MovieDetailScreen;