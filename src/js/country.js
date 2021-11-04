import Storage from './helper-local-storage';
import Countries from './helper-countries';

const storage = new Storage('country');
const countries = new Countries();



// On Page Load
const country = storage.getItems()[0];

countries.getCountryDetails(country.id);



// On Border Country Click
const blockTag = document.querySelector('.js-blockTag');

blockTag.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-blockTagItem')) {
    const countryId = e.target.getAttribute('data-value');

    const country = {
      id: countryId,
      name: null
    }

    storage.updateItem(country);
  }
});