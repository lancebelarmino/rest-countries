import Storage from './helper-local-storage';
import Countries from './helper-countries';

const storage = new Storage('country');
const countries = new Countries();

// Countries
// const countries = (function() {
//   const getData = async (url) => {
//     const response = await fetch(url);
//     const data = await response.json();

//     return data;
//   };

//   const getRandomCountries = () => {
//     const numArr = randomNumberGenerator(8, 250);

//     clearUI();

//     getData('https://restcountries.com/v2/all')
//       .then(data => {
//         numArr.forEach(num => {
//           renderCountry(data[num]);
//         })
//       })
//       .catch(err => console.log(err));
//   }

//   const getCountry = (country) => {
//     clearUI();
    
//     getData(`https://restcountries.com/v2/name/${country}`)
//       .then(data => {
//         data.forEach(country => {
//           renderCountry(country);
//         });
//       })
//       .catch(err => renderErrorMessage());
//   }

//   const getCountriesByRegion = (region) => {
//     clearUI();

//     getData(`https://restcountries.com/v2/region/${region}`)
//       .then(data => {
//         data.forEach(country => {
//           renderCountry(country);
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   const renderCountry = (country) => {
//     const countryName = encodeURIComponent(country.name.toLowerCase()).replace(/%20/g, "-");
//     const countriesBlock = document.createElement('div');

//     countriesBlock.classList.add('block', 'countries__block', 'js-block');

//     countriesBlock.setAttribute('data-value', country.name);

//     countriesBlock.innerHTML = `
//       <a href="/${countryName}" class="block__link js-blockLink">
//         <div class="block__wrapper">
//           <img src="${country.flags.png}" class="block__image" alt="">

//           <div class="block__content">
//             <h3 class="block__title">${country.name}</h3>
//             <p class="block__detail">
//               Population:
//               <span class="block__info">${country.population}</span>
//             </p>
//             <p class="block__detail">
//               Region:
//               <span class="block__info">${country.region}</span>
//             </p>
//             <p class="block__detail">
//               Capital:
//               <span class="block__info">${country.capital}</span>
//             </p>
//           </div>
//         </div>
//       </a>
//     `;

//     const parent = document.querySelector('.js-countriesWrapper');

//     parent.appendChild(countriesBlock);
//   };

//   const renderErrorMessage = () => {
//     const errorMessage = document.createElement('h2');

//     errorMessage.classList.add('countries__error', 'js-errorMessage');

//     errorMessage.innerHTML = `
//       Sorry, country not found.
//     `

//     const parent = document.querySelector('.js-countriesWrapper');

//     parent.appendChild(errorMessage);
//   }

//   const clearUI = () => {
//     const countries = document.querySelectorAll('.js-block');

//     countries.forEach(country => {
//       country.remove();
//     });

//     const error = document.querySelector('.js-errorMessage');

//     if (error) {
//       error.remove();
//     }
//   }

//   return {
//     init() {
//       getRandomCountries();
//     },

//     filter(filter, name) {
//       if (filter === 'region') {
//         getCountriesByRegion(name);
//       } else if (filter === 'country') {
//         getCountriesByName(name);
//       }
//     },

//     search(country) {
//       if (country === '') {
//         getRandomCountries();
//       } else {
//         getCountry(country);
//       }
//     }
//   }
// })();

// countries.init();

countries.init();

const countriesWrapper = document.querySelector('.js-countriesWrapper');

countriesWrapper.addEventListener('click', event => {
  if (event.target.classList.contains('js-blockLink')) {
    const country = event.target.parentElement.getAttribute('data-value');

    storage.updateItem(country);
  }
});



// Search
const searchPrompt = document.querySelector('.js-searchPrompt');

const getCountry = debounce(function() {
  countries.getCountry(searchPrompt.value);
}, 600);

searchPrompt.addEventListener('keyup', getCountry);




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

dropdownMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown__option')) {
    const region = event.target.getAttribute('data-value');

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