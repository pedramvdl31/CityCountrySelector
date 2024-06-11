async function search() {
    const userInput = document.getElementById('userInput').value;
    const firstChar = userInput.charAt(0).toLowerCase();

    try {
        const response = await fetch(`data/cities_${firstChar}.json`);
        if (!response.ok) {
            throw new Error('JSON file not found');
        }

        const data = await response.json();
        const results = data.filter(item => item.name.toLowerCase().includes(userInput.toLowerCase()));

        displayResults(results);
    } catch (error) {
        console.error('Error fetching JSON:', error);
        document.getElementById('results').innerText = 'No results found or error fetching JSON file.';
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerText = 'No results found.';
    } else {
        const ul = document.createElement('ul');
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.name;
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
    }
}