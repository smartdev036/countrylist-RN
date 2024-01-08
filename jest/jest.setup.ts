jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(),
    // Add other methods you use from AsyncStorage
  };
});
