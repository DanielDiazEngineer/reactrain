import { getAllCountries } from "./services/country-service";
import { useState } from "react";
import { useEffect } from "react";
/*
- When the application loads, all countries are displayed in the list with "Afghanistan" at the top.
- Typing "f" in the search input displays a filtered list of countries starting with "Afghanistan" followed by "Burkina Faso".
- Typing "r" to make the filter "fr" displays a filtered list starting with "Central African Republic" followed by "France" and ending with "South Africa" in 6th position.
- Typing "A" to make the filter "frA" narrows the list to display only "France".
- Clicking on the "Star" next to "France" marks it as starred, and the list item receives a star. Clicking it again unstars it.
- Clearing the search input displays all countries again, with "Afghanistan" at the top of the list.
- Typing "fr", then starring "France" causes "France" to have a star. Then typing "frAn" maintains the star on "France". Then, after clearing the input and typing "f" again, "France" remains starred.*/
export default function App() {
    let filter = "";
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const filteredCountries = countries
        .sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
        .filter((country) => country.name.includes(filter ?? ""));

    useEffect(() => {
        async function fetchCountries() {
            const letters = await getAllCountries();
            setCountries(letters);
            setIsLoading(false);
        }
        fetchCountries();
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Country Selection</h1>
            </header>
            <div data-testid="dropdown" className="dropdown-container">
                <SearchInput filter={filter} onSearch={(value) => (filter = value)} />
                {isLoading ? (
                    <p className="loading-text">Loading countries...</p>
                ) : (
                    <CountryList
                        countries={filteredCountries}
                        onFavorite={(country) => {
                            const index = countries.map((c) => c.code).indexOf(country.code);
                            countries[index].favorite = !countries[index].favorite;
                            setCountries(countries);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

function CountryList({ countries, onFavorite }) {
    return (
        <ul className="country-list">
            {countries.map((country) => (
                <li
                    key={country.code}
                    data-testid="dropdown-item"
                    className="country-item"
                >
                    {country.name} {country.favorite ? "⭐️" : ""}
                    <button onClick={() => onFavorite(country)}>
                        {country.favorite ? "Un-star" : "Star"}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function SearchInput({ filter, onSearch }) {
    const [inputValue, setInputValue] = useState(filter);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value);
    };

    return (
        <input
            type="text"
            data-testid="filter"
            placeholder="Enter country name"
            value={inputValue}
            onChange={handleChange}
            className="country-input"
        />
    );
}



/*countryservices.js*/
/*import { ALL_COUNTRIES } from "../data/countries";

export async function getAllCountries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL_COUNTRIES);
    }, 1000);
  });
}



data:
export const ALL_COUNTRIES = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },

  counter
  export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

*/