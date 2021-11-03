import Storage from './helper-local-storage';
import Countries from './helper-countries';

const storage = new Storage('country');
const countries = new Countries();

// Country
const country = storage.getItems()[0];

console.log(country);

countries.getCountry(country);