import Storage from './helper-local-storage';

const storage = new Storage('country');

export default class Countries {
  constructor() {}

  init() {
    this.getRandomCountries();
  }

  async getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  getRandomCountries() {
    const numArr = this.getRandomNumbers(8, 250);

    this.clearUI();

    this.getData('https://restcountries.com/v3.1/all')
      .then(data => {
        numArr.forEach(num => {
          this.renderCountries(data[num]);
        })
      })
      .catch(err => console.log(err));
  }

  getCountry(country) {
    this.clearUI();

    this.getData(`https://restcountries.com/v3.1/name/${country}`)
      .then(data => {
        data.forEach(country => {
          this.renderCountries(country);
        });
      })
      .catch(err => this.renderErrorMessage());
  }

  getCountryDetails(country) {
    this.getData(`https://restcountries.com/v3.1/alpha/${country}`)
      .then(data => {
        data.forEach(item => {
          
          const country = {
            id: item.cioc,
            name: item.name.common
          };

          storage.updateItem(country);

          this.renderCountry(item);
        });
      })
      .catch(err => console.log(err));
  }

  getCountriesByRegion(region) {
    this.clearUI();

    this.getData(`https://restcountries.com/v3.1/region/${region}`)
      .then(data => {
        data.forEach(country => {
          this.renderCountries(country);
        });
      })
      .catch(err => console.log(err));
  }

  renderCountries(country) {
    const countryName = encodeURIComponent(country.name.common.toLowerCase()).replace(/%20/g, "-");
    const countriesBlock = document.createElement('div');

    countriesBlock.classList.add('block', 'countries__block', 'js-block');

    countriesBlock.setAttribute('data-value', country.cca3);

    countriesBlock.innerHTML = `
      <a href="/${countryName}" class="block__link js-blockLink">
        <div class="block__wrapper">
          <img src="${country.flags.png}" class="block__image" alt="">

          <div class="block__content">
            <h3 class="block__title">${country.name.common}</h3>
            <div class="block__detail-group">
              <p class="block__detail">
                Population:
                <span class="block__info">${country.population}</span>
              </p>
              <p class="block__detail">
                Region:
                <span class="block__info">${country.region}</span>
              </p>
              <p class="block__detail">
                Capital:
                <span class="block__info">${country.capital}</span>
              </p>
            </div>
          </div>
        </div>
      </a>
    `;

    const parent = document.querySelector('.js-countriesWrapper');

    parent.appendChild(countriesBlock);
  };

  renderCountry(country) {
    const blockImage = document.querySelector('.js-blockImage');
    const blockTitle = document.querySelector('.js-blockTitle');
    const blockGroup1 = document.querySelector('.js-blockGroup1');
    const blockGroup2 = document.querySelector('.js-blockGroup2');
    const blockTag = document.querySelector('.js-blockTag');

    const nativeName = Object.keys(country.name.nativeName)[0];
    const currency = Object.keys(country.currencies)[0];
    const language = Object.keys(country.languages)[0];

    blockImage.setAttribute('src', country.flags.png);

    blockTitle.textContent = country.name.common;

    blockGroup1.innerHTML = `
      <p class="block__detail">
        Native Name:
        <span class="block__info">${country.name.nativeName[nativeName].official}</span>
      </p>
      <p class="block__detail">
        Population:
        <span class="block__info">${country.population}</span>
      </p>
      <p class="block__detail">
        Region:
        <span class="block__info">${country.region}</span>
      </p>
      <p class="block__detail">
        Sub Region:
        <span class="block__info">${country.subregion}</span>
      </p>
      <p class="block__detail">
        Capital:
        <span class="block__info">${country.capital[0]}</span>
      </p>
    `;

    blockGroup2.innerHTML = `
      <p class="block__detail">
        Top Level Domain:
        <span class="block__info">${country.tld}</span>
      </p>
      <p class="block__detail">
        Currencies:
        <span class="block__info">${country.currencies[currency].name}</span>
      </p>
      <p class="block__detail">
        Languages:
        <span class="block__info">${country.languages[language]}</span>
      </p>
    `;

    country.borders.forEach(country => {
      const blockLink = document.createElement('a');

      blockLink.classList.add('block__tag-item', 'js-blockTagItem');
      
      this.getData(`https://restcountries.com/v3.1/alpha/${country}`)
      .then(data => {
        data.forEach(country => {
          blockLink.setAttribute('href', `/${country.name.common}`);
          blockLink.setAttribute('data-value', `${country.cioc}`);
          blockLink.textContent = country.name.common;
        });
      })
      .catch(err => console.log(err));

      blockTag.appendChild(blockLink);
    });
  }

  renderErrorMessage() {
    const errorMessage = document.createElement('h2');

    errorMessage.classList.add('countries__error', 'js-errorMessage');

    errorMessage.innerHTML = `
      Sorry, country not found.
    `

    const parent = document.querySelector('.js-countriesWrapper');

    parent.appendChild(errorMessage);
  }

  // Helpers
  getRandomNumbers(numLength, maxNum) {
    let numArr = [];
  
    for (let i = 0; i < numLength; i++) {
      const num = Math.floor(Math.random() * maxNum) + 1;
  
      numArr.push(num);
    }
  
    return numArr;
  }

  clearUI() {
    const countries = document.querySelectorAll('.js-block');

    countries.forEach(country => {
      country.remove();
    });

    const error = document.querySelector('.js-errorMessage');

    if (error) {
      error.remove();
    }
  }
}