export function createCountryList(countries) {
  return countries
    .map(
      ({ flags, name }) => /*html*/ `<li class="country-list__item">
      <img class="country-list__img" src="${flags.svg}" alt="${name.official}" width = 100/>
      <h2 class="country-list__title">${name.official}</h2>
  </li>`
    )
    .join('');
}

export function createCountryOne(country) {
  return country
    .map(
      ({
        flags,
        name,
        capital,
        population,
        languages,
      }) => /*html*/ `<div class="country-info__card"><div class="country-info__box"><img class="country-info__img" src="${
        flags.svg
      }" alt="${name.official}" width=100/>
  <h1 class="country-info__title">${name.official}</h1></div>
  <p class="country-info__text"><span>Capital:</span> ${capital}</p>
  <p class="country-info__text"><span>Population:</span> ${population}</p>
  <p class="country-info__text"><span>Languages:</span> ${Object.values(
    languages
  ).join(', ')}</p></div>`
    )
    .join('');
}
