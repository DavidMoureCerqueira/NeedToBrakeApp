import { Country } from '../interfaces/Country';
import { RestCountry } from '../interfaces/restCountry';

export function mapRestCountryToCountry(restCountry: RestCountry): Country {
  return {
    flags: restCountry.flags.svg,
    name: restCountry.name.common,
  };
}
export function mapResCountryToCountryArray(restCountries: RestCountry[]): Country[] {
  return restCountries.map((restCountry) => mapRestCountryToCountry(restCountry));
}
