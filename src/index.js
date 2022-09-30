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
  e.preventDefault();
  const { value } = e.target;
  const searchQuery = value.trim().toLowerCase();
  console.log('🚀 ~ onSearch ~ normalizeInput', searchQuery);

  if (!searchQuery) {
    console.log('no input search country');
      return;
    }

  fetchCountries('sw')
    .then(countryArr => {
      console.log(countryArr.length);
      console.log('🚀 ~ countryArr', countryArr);

      if (countryArr.length > 10) {
        console.log('>10');
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );

        // Notify.info(
        //   'Too many matches found. Please enter a more specific name.'
        // );
      } else if (countryArr.length >= 2 && countryArr.length <= 10) {
        console.log('2-10');
        countryList.innerHTML = createCountryList(countryArr);
      } else if (countryArr.length === 1) {
        console.log('=1');
        // const markup = createCountryOne(countryArr);
        countryInfo.innerHTML = createCountryOne(countryArr);
        // countryInfo.innerHTML = markup;
      }
    })
    .catch(error => {
      // console.log('🚀 ~ fetchCountries ~ error', error);
      console.log('🚀 ~ fetchCountries ~ error', error.message);
      console.log('Oops, there is no country with that name');
      // Notify.failure('Oops, there is no country with that name');
    });

  // const findCountry = fetchCountries.filter(({ name }) => {
  //     return name.toLowerCase().includes(normalizeInput);
  // });

  // if (findCountry.length > 1) {
  //   setErrorText('');

  //   const markup = createCountriList(findCountry).join('');
  //   setListHTML(markup);
  // } else if (findCountry.length === 1) {
  //   setErrorText('');

  //   const countryMarkup = createCountriInfo(findCountry);
  //   setListHTML(countryMarkup);
  // } else {
  //   setErrorText(`${normalizeInput} not found!!!`);
  //   setListHTML('');
  // }
};

// const testArr = ['ukraine', 'peru', 'japan','canada'];

function fetchCountries(name) {
  // const prom = names.map(name => {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`;
    return fetch(URL).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  // });
// return Promise.all(prom);
};

// fetchCountries('uk')
//   .then(data => {
//     console.log('🚀 ~ data', data);
//     // console.log(data.length);
//     renderCountries(data);
//   })
//   .catch(error => {
//     // console.log('🚀 ~ fetchCountries ~ error', error);
//     console.log('🚀 ~ fetchCountries ~ error', error.message);
//     console.log('Oops, there is no country with that name');
//   });


// function fetchCountries(name) {
//   // fetch('https://restcountries.com/v3.1/name/peru')
//   const URL = `https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`;

//   return fetch(URL).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
// fetchCountries('peru')
//   .then(renderCountries)
//   .catch(error => {
//     console.log('🚀 ~ fetchCountries ~ error', error);
//   });


function renderCountries(countries) {
  // console.log("🚀 ~ renderCountries ~ countries", countries)
  // console.log('countries length -', countries.length);

  //   const markup = countries.map(country => {
  //     console.log('🚀 ~ markup ~ country', country);
  //  createCountriInfo(country);
  //     console.log(createCountriInfo(country));
  //   })
  // countryInfo.innerHTML = markup;

  // const markup = countries.forEach(element => {
  //   console.log('🚀 ~ markup ~ element', element);
  //  createCountriInfo(element);
  //   // createCountriInfo(element);

  // });

  // countryInfo.innerHTML = markup;
  // console.log("🚀 ~ renderCountries ~ markup", markup)

  // console.log('🚀 ~ fetchCountries ~ coountry', country);
  // const markup = createCountryOne(countries);
  // const markup = createCountriList(countries);
  // console.log('🚀 ~ fetchCountries ~ markup', markup);
  // countryList.innerHTML = markup;
  // countryInfo.innerHTML = markup;
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
  // console.log("🚀 ~ createCountriInfo ~ country", country)
  return country
    .map(
      ({ flags, name, capital, population, languages }) =>
        // const { flags, name, capital, population, languages } = country[0];
  /*html*/ `<div>
  <img src="${flags.svg}" alt="${name.official}" width = 100/>
  <h1>${name.official}</h1>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages).join(', ')}</p>
  </div>`
    )
    .join('');
}

// function createCountriInfo([country]) {
//   console.log("🚀 ~ createCountriInfo ~ country", country)
//   const { flags, name, capital, population, languages } = country;
//     return /*html*/ `<div>
//   <img src="${flags.svg}" alt="${name.official}" width = 100/>
//   <h1>${name.official}</h1>
//   <p>Capital: ${capital}</p>
//   <p>Population: ${population}</p>
//   <p>Languages: ${Object.values(languages).join(', ')}</p>
//   </div>`;
// }

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов


// function setListHTML(string) {
// //   listRef.innerHTML = string;
//   countryList.innerHTML = string;
    
// }

// function setErrorText(text) {
// //   outputErrorRef.textContent = text;
//     console.log('ERROR -->', text);
// }




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
