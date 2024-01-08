import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CountryDetailScreen from './screens/CountryDetailScreen';
import { Country } from './types/country';


type RootStackParamList = {
  Home: undefined;
  CountryDetail: { country: Country };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CountryDetail" component={CountryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
