import { refs } from './refs';
const { countryList, countryInfo } = refs;

export function clearItem(arg) {
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
