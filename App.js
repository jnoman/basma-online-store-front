import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, SafeAreaView, FlatList, View, Image } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://192.168.8.93:8080/login', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: 'admin@gmail.com',
  //       password: 'aaaaaaaa'
  //     }),

  //   }).then((response) => {
  //     console.log(response.headers.map.authorization);
  //     return Promise.all(response.headers);
  //   }).then((headers) => {
  //     //setData(headers.map.authorization);
  //     if(headers.map.authorization !== undefined){
  //       setData('login succes');
  //     } else {
  //       setData('email ou mot de pass et invalide');
  //     }
  //   }).catch((error) => setData(error))
  // });

  useEffect(() => {
    fetch('http://192.168.8.93:8080/produits')
      .then((response) => response.json())
      .then((json) => setData(json._embedded.produits))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <Image
              style={styles.img}
              source={{
                uri: item.images[0],
              }}
            />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  img: {
    width: 250,
    height: 150,
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15
  },
  text: {
    textAlign: 'center',
    fontSize: 16
  },
});
