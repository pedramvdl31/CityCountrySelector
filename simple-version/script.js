document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInputSimple');
    const resultsDiv = document.getElementById('resultsSimple');

    if (searchInput) {
        searchInput.addEventListener('input', function(event) {
            const searchTerm = event.target.value.trim();
            if (searchTerm) {
                const firstChar = searchTerm.charAt(0).toLowerCase();
                const jsonFileName = `simple-version/data/cities_${firstChar}.json`;

                fetch(jsonFileName)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Could not find file: ${jsonFileName}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const results = searchInJson(data, searchTerm);
                        displayResults(results, resultsDiv, searchInput);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                resultsDiv.classList.remove('show');
            }
        });
    }

    function searchInJson(data, searchTerm) {
        const results = [];
        for (const item of data) {
            if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({ name: item.name, country: item.country });
            }
        }
        return results.slice(0, 10); // Only return the first 10 results
    }

    function displayResults(results, resultsDiv, searchInput) {
        resultsDiv.innerHTML = '';
        if (results.length > 0) {
            resultsDiv.classList.add('show');
            results.forEach(result => {
                const resultItem = document.createElement('li');
                resultItem.classList.add('dropdown-item', 'custom-dropdown-item');
                resultItem.textContent = `${result.name}, ${result.country}`;
                resultItem.addEventListener('click', function() {
                    searchInput.value = resultItem.textContent;
                    resultsDiv.classList.remove('show');
                });
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.classList.remove('show');
        }
    }
});
