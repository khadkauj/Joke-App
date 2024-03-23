import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

// Details screen component
const DetailsScreen = ({ route }) => {
  const { punchline, setup } = route.params.item;

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailBody}>{setup}</Text>
      <Text style={styles.detailTitle}>{punchline}</Text>
    </View>
  );
};

// Home screen component
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setrefreshing] = useState(false)

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/ten');
      setData(response.data);
      setrefreshing(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshData = () => {
    setrefreshing(true)
    fetchData();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.punchline}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.detailTitle}>Programming Jokes</Text>
      <Text></Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={fetchData}
        refreshing={refreshing}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
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
    paddingTop: -20
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
    marginBottom: 32,
    color: '#333',
    display: "none"
  },
  detailBody: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555'
  },
  detailsContainer: {
    textAlign: 'center',
    margin: "auto"
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    alignItems: 'center', 
    shadowColor: '#ecf0f1', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5, 
    padding: 14
  },
  detailBody: {
    fontSize: 16, 
    marginBottom: 10, 
    textAlign: 'center',
  },
  detailTitle: {
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
});
