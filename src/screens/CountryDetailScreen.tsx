import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Country } from '../types/country';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  CountryDetail: { country: Country };
};

type CountryDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'CountryDetail'>;
};

const CountryDetailScreen: React.FC<CountryDetailScreenProps> = ({ route }) => {
  const { country } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      await AsyncStorage.removeItem('lastSelectedCountry');
      console.log("unsubscribe")
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{country.name}</Text>
      <Text>Code: {country.code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CountryDetailScreen;
