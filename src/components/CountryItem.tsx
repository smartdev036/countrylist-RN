import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Country } from '../types/country';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes'; // Adjust the import path as necessary


type Props = {
  country: Country;
};  

const CountryItem: React.FC<Props> = ({ country }) => {

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.countryName}>{country.name}</Text>
      <Text style={styles.countryCode}>({country.code})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3, // for Android shadow
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  countryCode: {
    fontSize: 14,
    color: '#666',
  },
});

export default CountryItem;
