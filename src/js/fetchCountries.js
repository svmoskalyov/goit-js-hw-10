export function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=flags,name,capital,population,languages`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
