// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import debounce from 'lodash.debounce';
import './css/styles.css';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

//    <input type="text" id="search-box" />
//     <ul class="country-list"></ul>
//     <div class="country-info"></div>

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// const debounceHandleInput = _.debounce(onSearch, 500);
inputSearch.addEventListener('input', onSearch);


function onSearch(e) {
    const { value } = e.target;
    const normalizeInput = value.trim().toLowerCase();
    console.log("🚀 ~ onSearch ~ normalizeInput", normalizeInput)

    if (!normalizeInput) {
        setErrorText('');
        setListHTML('');
        return;
    }

    // const findCountry = fetchCountries.filter(({ name }) => {
    //     return name.toLowerCase().includes(normalizeInput);
    // });

    if (findCountry.length > 1) {
      setErrorText('');

      const markup = createCountriList(findCountry).join('');
      setListHTML(markup);
    } else if (findCountry.length === 1) {
      setErrorText('');

      const countryMarkup = createCountriInfo(findCountry);
      setListHTML(countryMarkup);
    } else {
      setErrorText(`${normalizeInput} not found!!!`);
      setListHTML('');
    }
};


function fetchCountries(name) {
    // body
    // fetch('https://restcountries.com/v3.1/name/peru')
    fetch(
      'https://restcountries.com/v3.1/name/peru?fields=flags,name,capital,population,languages'
    )
      .then(response => {
        return response.json();
      })
      .then(coountry => {
        console.log('🚀 ~ fetchCountries ~ coountry', coountry);
        const markup = createCountriInfo(coountry);
        console.log('🚀 ~ fetchCountries ~ markup', markup);
      })
      .catch(error => {
        console.log('🚀 ~ fetchCountries ~ error', error);
      });
}

fetchCountries();
// console.log("🚀 ~ fetchCountries", fetchCountries)

function createCountriList(countries) {
  return countries.map(
    ({ name, capital }) =>
      `<li>
  <h5> Country name: ${name}</h5>
  <p>Country capital: ${capital}</p>
  </li>`
  );
}

function createCountriInfo([country]) {
  const { flags, name, capital, population, languages } = country;
    return /*html */ `<li>
  <img src="${flags.svg}" alt="${name.official}" width = 100/>
  <h3> Country name: ${name.official}</h3>
  <p>Country capital: ${capital}</p>
  <p>population: ${population}</p>
  <p>languages: ${Object.values(languages).join(', ')}</p>
  </li>`;
}

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов


function setListHTML(string) {
//   listRef.innerHTML = string;
  countryList.innerHTML = string;
    
}

function setErrorText(text) {
//   outputErrorRef.textContent = text;
    console.log('ERROR -->', text);
}




// ---
// if (country > 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
// }

// if (country >= 2 && country <= 10) {
//     // list country
// }

// if (!country) {
//   return Notify.failure('Oops, there is no country with that name');
// }

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });
