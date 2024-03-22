import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import axios from 'axios';

// Details screen component
const DetailsScreen = ({ route }) => {
  const { punchline, setup } = route.params.item;

  return (
    <View style={styles.container}>
      <Text style={styles.detailBody}>{setup}</Text>
      <Text style={styles.detailTitle}>{punchline}</Text>
    </View>
  );
};

// Home screen component
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/ten');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  const exitApp = () => {
    // Handle exit app action here
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.punchline}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Refresh" onPress={refreshData} />
        <Button title="Exit" onPress={exitApp} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerStyle: { backgroundColor: '#3498db' }, headerTintColor: '#fff' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details', headerStyle: { backgroundColor: '#3498db' }, headerTintColor: '#fff' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 10,
    paddingTop: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3
  },
  title: {
    fontSize: 18,
    color: '#333'
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  detailBody: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555'
  }
});
