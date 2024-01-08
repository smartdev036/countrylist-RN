import { Country } from "./country";

export type RootStackParamList = {
  Home: undefined;
  CountryDetail: { country: Country };
};

export type NavigationProp = {
  navigate: (route: string, params?: object) => void | undefined;
};