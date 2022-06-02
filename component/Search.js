import React from 'react';
import { Button, TextInput, Text, FlatList, StyleSheet, View, TouchableHighlight, Image } from 'react-native';

const searchPost = async (accessToken, title, year,director,genre, page) => {
    // alert("Email: " + email + ", password: " + password);
    return await fetch('http://10.0.2.2:8082/movie/search?title=' + title + '&year=' + year + '&director=' + director + '&genre=' + genre + '&page=' + page, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + accessToken
        },
        params: JSON.stringify({
            title: title,
            year: year,
            director : director,
            genre : genre
        })
    })
    .then((response) => response.json() )
    .then((json) => {
        //console.log(json);
        return json;
    })
    .catch((error) => {
        console.error(error);
    });
};


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


const SearchScreen = ({ route, navigation }) => {
    const { accessToken, refreshToken } = route.params;
    const [title, onChangeTitle] = React.useState("");
    const [year, onChangeYear] = React.useState("");
    const [director, onChangeDirector] = React.useState("");
    const [genre, onChangeGenre] = React.useState("");
    const [page, onChangePage] = React.useState(1);
    const [sortBy, onChangeSortBy] = React.useState(null);
    const [order, onChangeOrder] = React.useState(null);

    const [searchResult, setSearchResult] = React.useState([]);

    // addMovie("accessToken", accessToken, "https://reactnative.dev/img/tiny_logo.png");
    // addMovie("refreshToken", refreshToken, "https://reactnative.dev/img/tiny_logo.png");

    return (
        
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                placeholder="title"
                value={title}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeYear}
                value={year}
                placeholder="year"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeDirector}
                value={director}
                placeholder="director"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeGenre}
                value={genre}
                placeholder="genre"
            />
            <View style={styles.buttonContainer}>
            <Button
                onPress = {
                    async () => {
                        const result = await searchPost(accessToken,title, year,director,genre,page);
                        if (result.result.code == 2020) {
                            setSearchResult(result.movies);
                            //alert("Search Success")
                            //navigation.navigate("Search", {accessToken: result.accessToken, refreshToken: result.refreshToken});
                        } else {
                            alert("Search fail");
                        }
                    }
                }
                title="SEARCH"
            />
            </View>




            <View style={styles.container}>
            <FlatList
                data={searchResult}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <TouchableHighlight 
                            onPress={() => {
                                navigation.navigate("MovieDetail", {accessToken: accessToken, refreshToken: refreshToken, movieId : item.id});
                            }} 
                            underlayColor="white">
                            <View style={styles.subContainer} flexDirection='row'>
                                <Image style={styles.thumbnail}
                                    source={{
                                        uri: "https://image.tmdb.org/t/p/original" + item.posterPath,
                                      }}/>
                                <Text style={{ fontSize: 22, margin: 10}}>
                                        {item.year} - {item.title}
                                </Text>
                            </View>    
                        </TouchableHighlight>
                    </View>
                )}
                ItemSeparatorComponent={movieDivider}
            />
            {/* <Text  
                style={styles.titleText}
            >
                "accessToken: {accessToken}" {"\n"}
                "refreshToken: {refreshToken}"
            </Text> */}
            <View style={{ display: 'flex', justifyContent: 'flex-end', flexDirection:"row" }}>
                <Button
                    onPress = {
                        async () => {
                            if (page > 1){onChangePage(page - 1)};
                            const result = await searchPost(accessToken,title, year,director,genre,page - 1);
                            if (result.result.code == 2020) {
                                setSearchResult(result.movies);
                                //alert("Search Success")
                                //navigation.navigate("Search", {accessToken: result.accessToken, refreshToken: result.refreshToken});
                            } else {
                                alert("Search fail");
                            }
                        }
                    }
                    title="Prev"
                />
                <Button
                    onPress = {
                        async () => {
                            onChangePage(page + 1);
                            const result = await searchPost(accessToken,title, year,director,genre,page + 1);
                            if (result.result.code == 2020) {
                                setSearchResult(result.movies);
                                //alert("Search Success")
                                //navigation.navigate("Search", {accessToken: result.accessToken, refreshToken: result.refreshToken});
                            } else {
                                alert("Search fail");
                            }
                        }
                    }
                    title="Next"
                />
            </View>
        </View>
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
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
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


  
export default SearchScreen;