document.getElementById('searchInput').addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
        const firstChar = searchTerm.charAt(0).toLowerCase();
        const jsonFileName = `data/cities_${firstChar}.json`;

        fetch(jsonFileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not find file: ${jsonFileName}`);
                }
                return response.json();
            })
            .then(data => {
                const results = searchInJson(data, searchTerm);
                displayResults(results);
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        document.getElementById('results').classList.remove('show');
    }
});

function searchInJson(data, searchTerm) {
    const results = [];
    for (const item of data) {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({ name: item.name, country: item.country });
        }
    }
    return results.slice(0, 10); // Only return the first 10 results
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (results.length > 0) {
        resultsDiv.classList.add('show');
        results.forEach(result => {
            const resultItem = document.createElement('li');
            resultItem.classList.add('dropdown-item', 'custom-dropdown-item');
            resultItem.textContent = `${result.name}, ${result.country}`;
            resultItem.addEventListener('click', function() {
                document.getElementById('searchInput').value = resultItem.textContent;
                resultsDiv.classList.remove('show');
            });
            resultsDiv.appendChild(resultItem);
        });
    } else {
        resultsDiv.classList.remove('show');
    }
}
