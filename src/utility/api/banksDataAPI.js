import { BASE_URL } from '../../constants/apiEndpoints';
import { myLocalStorage } from '../localStorageWrapper';
import { allbanks_dummyData } from '../../constants/dummyData';

export async function getAllBanksData(city) {
  if (myLocalStorage.getItem(city)) {
    return JSON.parse(myLocalStorage.getItem(city));
  } else {
    const url = BASE_URL + `?city=${city}`;
    return await fetch(url).then((result) => result.json());
    // return allbanks_dummyData;
  }
}
