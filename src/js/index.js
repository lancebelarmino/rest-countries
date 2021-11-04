import Storage from './helper-local-storage';
import Countries from './helper-countries';

const storage = new Storage('country');
const countries = new Countries();



// Initialize
countries.init();



// Country Click Event
const countriesWrapper = document.querySelector('.js-countriesWrapper');

countriesWrapper.addEventListener('click', e => {
  if (e.target.classList.contains('js-blockLink')) {
    const countryId = e.target.parentElement.getAttribute('data-value');

    const country = {
      id: countryId,
      name: null
    }

    storage.updateItem(country);
  }
});



// Search
const searchForm = document.querySelector('.js-searchForm');

const searchPrompt = document.querySelector('.js-searchPrompt');

const getCountry = debounce(function() {
  countries.getCountry(searchPrompt.value);
}, 600);

searchPrompt.addEventListener('keyup', e => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    countries.getCountry(searchPrompt.value);
  }

  getCountry();
});


// Dropdown
const dropdownMenu = document.querySelector('.js-dropdownMenu');
const dropdownBtn = document.querySelector('.js-dropdownBtn');

const dropdown = (function() {
  const toggle = () => {
    dropdownMenu.classList.toggle('dropdown__menu--visible');
  }

  const update = (region) => {
    const selectedText = document.querySelector('.js-selected');

    selectedText.textContent = region;
  }

  return { 
    toggle,
    update,
  }
})();

dropdownBtn.addEventListener('click', () => {
  dropdown.toggle();
});

dropdownMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('dropdown__option')) {
    const region = e.target.getAttribute('data-value');

    countries.getCountriesByRegion(region);
    dropdown.update(region);
    dropdown.toggle();
  }
});



// Helpers
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}