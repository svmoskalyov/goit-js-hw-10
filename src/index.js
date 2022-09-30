import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { refs } from './js/refs';
import { clearItem } from './js/clearItems';
import { fetchCountries } from './js/fetchCountries';
import { createCountryList, createCountryOne } from './js/markup';

const DEBOUNCE_DELAY = 300;
const { inputSearch, countryList, countryInfo } = refs;

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
