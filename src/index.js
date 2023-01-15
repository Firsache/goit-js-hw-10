import './css/styles.css';
import {debounce} from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const refs = {
    searchInputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

function onInputSearch(evt) {
    const query = evt.target.value;
    console.log(query);

    fetchCountries(query)
        .then(data => {
            // console.log(data);
        renderCountryCardMarkUp(data) // array of countries, need to use map + join + render markup
    })
    .catch(err => console.log(err));
}

function renderCountryCardMarkUp(data) {
    const markupCountry = data.map(({name, capital, population, flags, languages}) => {
        return `${name.official} ${flags.svg}`
    }).join('');

    refs.countryInfoEl.innerHTML = markupCountry;
}

Notify.info('Too many matches found. Please enter a more specific name.')
Notify.failure('Oops, there is no country with that name');
refs.searchInputEl.addEventListener('input', onInputSearch);
