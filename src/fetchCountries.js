export const fetchCountries = query => {
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    const params = new URLSearchParams('fields=name,capital,population,flags,languages');
    return fetch(`${BASE_URL}/${query}?${params}`).then(res => res.json());
}