import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const refs = {
    searchInputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

function onInputSearch(evt) {
    let query = evt.target.value.trim();
    if (!query) {
        refs.countryInfoEl.innerHTML = '';
        return;
    }

    fetchCountries(query)
        .then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            } else if (data.length >= 2) {
                refs.countryListEl.style.display = "block";
                refs.countryInfoEl.innerHTML = "";
                renderCountryList(data);
            } else {
                refs.countryListEl.style.display = "none";
                renderCountryCardMarkUp(data);
            }            
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}

function renderCountryList(data) {
    const markupCountry = data.map(({name, flags}) => {
        return `
        <li>
        <img src="${flags.svg}" alt="${name.official}" width="35">
        <span>${name.official}</span>
        </li>`
    }).join('');

    refs.countryListEl.innerHTML = markupCountry;
}

function renderCountryCardMarkUp(data) {
    const markupCountry = data.map(({ name, capital, population, flags, languages }) => {        
        return `
        <div class="country-header">
        <img src="${flags.svg}" alt="${name.official}" width="40">
        <h1>${name.official}</h1>
        </div>        
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
        `
    }).join('');

    refs.countryInfoEl.innerHTML = markupCountry;
}



refs.searchInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
