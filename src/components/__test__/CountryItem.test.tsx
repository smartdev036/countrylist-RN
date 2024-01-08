import React from 'react';
import { render } from '@testing-library/react-native';
import CountryItem from '../CountryItem'; // Adjust the path as necessary

// Mock country data
const mockCountry = {
  name: 'Test Country',
  code: 'TC',
};

describe('CountryItem', () => {
  it('should render country name and code', () => {
    // Render the CountryItem component with mock country data
    const { getByText } = render(<CountryItem country={mockCountry} />);

    // Check if the country name and code are rendered
    const countryName = getByText(mockCountry.name);
    const countryCode = getByText(`(${mockCountry.code})`);

    // Assertions
    expect(countryName).toBeTruthy();
    expect(countryCode).toBeTruthy();
  });
});
