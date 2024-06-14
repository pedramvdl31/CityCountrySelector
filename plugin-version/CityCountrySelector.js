class CityCountrySelector {
    constructor(containerId, dataPath) {
        this.container = document.getElementById(containerId);
        this.dataPath = dataPath;

        this.init();
    }

    init() {
        this.createElements();
        this.searchInput.addEventListener('input', (event) => this.handleInput(event));
    }

    createElements() {
        this.searchInput = document.createElement('input');
        this.searchInput.setAttribute('type', 'text');
        this.searchInput.setAttribute('class', 'form-control');
        this.searchInput.setAttribute('placeholder', 'Type in your city and select an option');
        this.searchInput.setAttribute('autocomplete', 'off');
        this.searchInput.id = 'searchInputPlugin';

        this.resultsDiv = document.createElement('ul');
        this.resultsDiv.setAttribute('class', 'dropdown-menu custom-dropdown w-100');
        this.resultsDiv.id = 'resultsPlugin';
        this.resultsDiv.setAttribute('aria-labelledby', this.searchInput.id);

        const inputGroup = document.createElement('div');
        inputGroup.setAttribute('class', 'input-group');

        const formGroup = document.createElement('div');
        formGroup.setAttribute('class', 'form-group');
        formGroup.setAttribute('style', 'position: relative;');

        inputGroup.appendChild(this.searchInput);
        formGroup.appendChild(inputGroup);
        formGroup.appendChild(this.resultsDiv);

        this.container.appendChild(formGroup);
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
