import { Country } from "./country";

export type RootStackParamList = {
  Home: undefined;
  CountryDetail: { country: Country };
};
