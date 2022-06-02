import React from 'react';
import { Text, FlatList, StyleSheet, View, TouchableHighlight, Image } from 'react-native';

var movieList = [
    { key: '1', value: 'uwu', thumbnail_url: 'https://reactnative.dev/img/tiny_logo.png' },
    { key: '2', value: 'qaq', thumbnail_url: 'https://reactnative.dev/img/tiny_logo.png' },
    { key: '3', value: '0w0', thumbnail_url: 'https://reactnative.dev/img/tiny_logo.png' }
];

const addMovie = (newKey, newValue, new_thumbnail_url) => {
    movieList.push({key : newKey, value: newValue, thumbnail_url: new_thumbnail_url });
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

const MainScreen = ({ route, navigation }) => {
    const { accessToken, refreshToken } = route.params;

    // addMovie("accessToken", accessToken, "https://reactnative.dev/img/tiny_logo.png");
    // addMovie("refreshToken", refreshToken, "https://reactnative.dev/img/tiny_logo.png");

    return (
        <View style={styles.container}>
            <FlatList
                data={movieList}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <TouchableHighlight 
                            onPress={() => {
                                alert("Key: " + item.key + "\nValue: " + item.value);
                            }} 
                            underlayColor="white">
                            <View style={styles.subContainer} flexDirection='row'>
                                <Image style={styles.thumbnail}
                                    source={{
                                        uri: item.thumbnail_url,
                                      }}/>
                                <Text style={{ fontSize: 22, margin: 10}}>
                                        {item.key} - {item.value}
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

export default MainScreen;