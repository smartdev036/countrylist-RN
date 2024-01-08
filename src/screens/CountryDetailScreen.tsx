import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Country } from '../types/country';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCountryDetails } from '../api/countryAPI';

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
  const [countryDetails, setCountryDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      await AsyncStorage.removeItem('lastSelectedCountry');
      await AsyncStorage.removeItem('lastSelectedCountryDetails');
      console.log("unsubscribe")
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Function to fetch additional country details
    const fetchDetails = async () => {
      try {
        let storedDetails = await AsyncStorage.getItem('lastSelectedCountryDetails');
        console.log("Stored: ", storedDetails)
        if(storedDetails) {
          setCountryDetails(JSON.parse(storedDetails));
        } else {
          const details = await fetchCountryDetails(country.code);
          if(details){
            await AsyncStorage.setItem('lastSelectedCountryDetails', JSON.stringify(details[0]))
            setCountryDetails(details[0]);
          }
        }
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchDetails();
  }, [country.code]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{country.name}-({country.code})</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>Alpha 3 Code: {countryDetails.cca3}</Text>
          <Text>Area: {countryDetails.area} sq km</Text>
          <Text>Population: {countryDetails.population}</Text>
          <Text>Region: {countryDetails.region}</Text>
          <Text>Subregion: {countryDetails.subregion}</Text>
          <Text>Languages: {Object.values(countryDetails?.languages).join(', ')}</Text>
          <Text>Timezones: {countryDetails.timezones?.join(', ')}</Text>
          <Image source={{ uri: countryDetails.flags?.png }} style={styles.flag} />
        </View>
      )}
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
  flag: {
    width: 100,
    height: 60,
    marginTop: 10,
  },
});

export default CountryDetailScreen;
