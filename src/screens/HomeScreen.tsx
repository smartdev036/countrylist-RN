import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Country } from '../types/country';
import { fetchCountries } from '../api/countryAPI';
import CountryItem from '../components/CountryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const HomeScreen: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const loadCountriesAndNavigate = async () => {
            const storedCountries = await AsyncStorage.getItem('countries');
            const lastSelectedCountryJson = await AsyncStorage.getItem('lastSelectedCountry');
            
            // Check if the lastCountry is stored.
            if (lastSelectedCountryJson) {
                const lastSelectedCountry = JSON.parse(lastSelectedCountryJson) as Country;
                navigation.navigate('CountryDetail', { country: lastSelectedCountry });
            }

            // Check if the Country list is stored.
            if (storedCountries) {
                setCountries(JSON.parse(storedCountries));
            } else {
                const fetchedCountries = await fetchCountries();
                setCountries(fetchedCountries);
                await AsyncStorage.setItem('countries', JSON.stringify(fetchedCountries));
            }

            setIsLoading(false);
        };

        loadCountriesAndNavigate();
    }, [navigation]);

    const handlePress = async (country: Country) => {
        await AsyncStorage.setItem('lastSelectedCountry', JSON.stringify(country));
        navigation.navigate('CountryDetail', { country });
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" testID='activity-indicator'/>
            ) : (
                <FlatList
                    data={countries}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
                            <CountryItem country={item} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.code}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    item: {
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default HomeScreen;
