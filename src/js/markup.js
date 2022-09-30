export function createCountryList(countries) {
  return countries
    .map(
      ({ flags, name }) => /*html*/ `<li>
      <img src="${flags.svg}" alt="${name.official}" width = 100/>
      <h2>${name.official}</h2>
  </li>`
    )
    .join('');
}

export function createCountryOne(country) {
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
