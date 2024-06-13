class CityCountrySelector {
    constructor(inputId, resultsId, dataPath) {
        this.searchInput = document.getElementById(inputId);
        this.resultsDiv = document.getElementById(resultsId);
        this.dataPath = dataPath;

        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', (event) => this.handleInput(event));
    }

    handleInput(event) {
        const searchTerm = event.target.value.trim();
        if (searchTerm) {
            const firstChar = searchTerm.charAt(0).toLowerCase();
            const jsonFileName = `${this.dataPath}/cities_${firstChar}.json`;

            fetch(jsonFileName)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not find file: ${jsonFileName}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const results = this.searchInJson(data, searchTerm);
                    this.displayResults(results);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            this.resultsDiv.classList.remove('show');
        }
    }

    searchInJson(data, searchTerm) {
        const results = [];
        for (const item of data) {
            if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({ name: item.name, country: item.country });
            }
        }
        return results.slice(0, 10); // Only return the first 10 results
    }

    displayResults(results) {
        this.resultsDiv.innerHTML = '';
        if (results.length > 0) {
            this.resultsDiv.classList.add('show');
            results.forEach(result => {
                const resultItem = document.createElement('li');
                resultItem.classList.add('dropdown-item', 'custom-dropdown-item');
                resultItem.textContent = `${result.name}, ${result.country}`;
                resultItem.addEventListener('click', () => {
                    this.searchInput.value = resultItem.textContent;
                    this.resultsDiv.classList.remove('show');
                });
                this.resultsDiv.appendChild(resultItem);
            });
        } else {
            this.resultsDiv.classList.remove('show');
        }
    }
}

// To initialize the plugin
document.addEventListener('DOMContentLoaded', () => {
    const cityCountrySelector = new CityCountrySelector('searchInput', 'results', 'data');
});
