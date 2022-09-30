import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const { value } = e.target;
  let searchQuery = value.trim().toLowerCase();

  if (!searchQuery) {
    clearItem();
    return;
  }

  fetchCountries(searchQuery)
    .then(countryArr => {
      if (countryArr.length > 10) {
        clearItem();
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countryArr.length >= 2 && countryArr.length <= 10) {
        clearItem('one');
        return (countryList.innerHTML = createCountryList(countryArr));
      } else if (countryArr.length === 1) {
        clearItem('list');
        return (countryInfo.innerHTML = createCountryOne(countryArr));
      }
    })
    .catch(error => {
      console.log(error.message);
      clearItem();
     return Notify.failure('Oops, there is no country with that name');
    });
}

function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function createCountryList(countries) {
  return countries
    .map(
      ({ flags, name }) => /*html*/ `<li>
      <img src="${flags.svg}" alt="${name.official}" width = 100/>
      <h2>${name.official}</h2>
  </li>`
    )
    .join('');
}

function createCountryOne(country) {
  return country
    .map(
      ({ flags, name, capital, population, languages }) => /*html*/ `<div>
  <img src="${flags.svg}" alt="${name.official}" width = 100/>
  <h1>${name.official}</h1>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages).join(', ')}</p>
  </div>`
    )
    .join('');
}

function clearItem(arg) {
  switch (arg) {
    case 'one':
      countryInfo.innerHTML = '';
      break;

    case 'list':
      countryList.innerHTML = '';
      break;

    default:
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
  }
}
