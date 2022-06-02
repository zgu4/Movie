import React from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from './component/Register';
import MainScreen from './component/Main'
import SearchScreen from './component/Search'
import MovieDetailScreen from './component/MovieDetail'

const loginPost = async (email, password) => {
    // alert("Email: " + email + ", password: " + password);
    return await fetch('http://10.0.2.2:8085/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((response) => response.json() )
    .then((json) => {
        console.log(json);
        return json;
    })
    .catch((error) => {
        console.error(error);
    });
};

const LoginScreen = ({navigation}) => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    return (
        
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                placeholder="Email"
                value={email}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <View style={styles.buttonContainer}>
            <Button
                onPress = {
                    async () => {
                        const result = await loginPost(email, password);
                        // alert("result: " + JSON.stringify(result));
                        if (result.result.code == 1020) {
                            // navigation.navigate("Main", {accessToken: result.accessToken, refreshToken: result.refreshToken});
                            navigation.navigate("Search", {accessToken: result.accessToken, refreshToken: result.refreshToken});
                        } else {
                            alert("Invalid login credential");
                        }
                    }
                }
                title="LOGIN"
            />
            </View>
            <View style={styles.buttonContainer}>
            <Button
                onPress = {() => navigation.navigate("Register")}
                title="SIGN UP"
                color="#841584"
            />
            </View>
      </View>
    );
};

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{ title: 'ZotMovie', headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="search"
              color="#841584"
            />
          ),}}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MyStack;