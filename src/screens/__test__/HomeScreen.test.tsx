import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCountries } from '../../api/countryAPI'; // Adjust the path as necessary
import { NavigationContainer } from '@react-navigation/native';

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mocking the fetchCountries API
jest.mock('../../api/countryAPI', () => ({
  fetchCountries: jest.fn(),
}));

// TypeScript cast for the mocked module
const mockedFetchCountries = fetchCountries as jest.MockedFunction<typeof fetchCountries>;
const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

// Create a mock navigation object
const mockNavigate = jest.fn();

// Mocking the useNavigation hook
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetchCountries.mockResolvedValue([{ name: 'Country 1' , code: "Co"}, { name: 'Country 2' , code: "C2" }]);
    mockedAsyncStorage.getItem.mockResolvedValue(null);
  });

  it('should initially show a loading indicator', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders countries after data fetch', async () => {
    let getByText: any;
    await act(async () => {
      const rendered = render(
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      );
      getByText = rendered.getByText;
    });

    // Verify that the countries are rendered
    expect(getByText('Country 1')).toBeTruthy();
    expect(getByText('Country 2')).toBeTruthy();
  });

  it('handles user interactions', async () => {
    let getByText: any;
    await act(async () => {
      const rendered = render(
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      );
      getByText = rendered.getByText;
    });

    // Assuming there is a button for navigation or some action
    const button = getByText('Navigate Button');
    fireEvent.press(button);

    // Verify navigation function was called
    expect(mockNavigate).toHaveBeenCalled();
  });

  // Add more tests as needed for different scenarios and interactions
});
