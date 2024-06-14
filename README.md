# CityCountrySelector.js

Developed by [Pedram Khoshnevis](https://github.com/pedramvdl31) and [Lara Mauricio](https://github.com/laradcm).

## City and Country Search Dropdown Plugin

This plugin provides a seamless and efficient way for developers to integrate a city and country search feature into their web applications. By leveraging JSON data files, this plugin allows users to type in a city name and receive a dropdown list of matching cities along with their respective countries. This feature enhances user experience by simplifying the selection process for locations, making it particularly useful for applications that require location-based information, such as travel booking sites, e-commerce platforms, and registration forms.

### How It Works

1. **User Input:** The user begins typing a city name into the input field.
2. **Fetch Data:** The plugin dynamically fetches the corresponding JSON file based on the first character of the user's input. For instance, if the user types "A", the plugin will look for a file named `cities_a.json`.
3. **Search JSON:** It searches within the fetched JSON data for city names that include the user's input.
4. **Display Results:** The first 10 matching city names and their countries are displayed in a dropdown list.
5. **Selection:** The user can click on a dropdown item to select it, which automatically populates the input field with the selected city and country.

### Features

- **Instant Search:** As the user types, the plugin quickly searches through a pre-defined JSON file to find matching city names and displays the results in a dropdown list.
- **Autocomplete:** The dropdown suggests up to 10 city and country matches based on the user's input, improving the speed and accuracy of the selection process.
- **Easy Integration:** With simple HTML, CSS, and JavaScript, this plugin can be easily integrated into any web application without the need for a backend server.
- **Customizable:** Developers can modify the JSON data structure, styling, and other functionalities to fit their specific needs.
- **User-Friendly Interface:** Utilizes Bootstrap for a responsive and modern design, ensuring a clean and intuitive user interface.

### Setup Instructions

To set up and test the City and Country Search Dropdown Plugin, follow these steps:

#### Project Structure

Organize your project files as shown below:

```plaintext
city-country-search/
│
├── simple-version/
│   ├── data/
│   │   ├── cities_a.json
│   │   ├── cities_b.json
│   │   └── ...
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
├── plugin-version/
│   ├── data/
│   │   ├── cities_a.json
│   │   ├── cities_b.json
│   │   └── ...
│   ├── index.html
│   ├── CityCountrySelector.js
│   └── styles.css
│
├── index.html
├── README.md
└── LICENSE
```

City and country names were taken from a database provided by dr5hn at [https://github.com/dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database). Thanks and shout out to dr5hn!

## Testing Locally

If you want to test the code locally, you might run into CORS errors. This happens because the files are being accessed directly from the file system. To avoid these errors, you need to run a simple HTTP server. Here are a few ways to do that:

### Using Python (built-in HTTP server)

Open a terminal or command prompt, navigate to your project directory, and run:

python -m http.server 8000
This will start a server at http://localhost:8000.

Using Node.js (http-server package)
If you have Node.js installed, you can use the http-server package.

Install http-server globally if you haven't already:

npm install -g http-server
Navigate to your project directory and run:

http-server -p 8000
This will start a server at http://localhost:8000.

Using Live Server (VS Code extension)
If you are using Visual Studio Code, you can use the Live Server extension.

Install the Live Server extension from the VS Code Marketplace.
Open your project in VS Code.
Right-click on your index.html file and select "Open with Live Server".
Using PHP (built-in server)
If you have PHP installed, you can use its built-in server. Navigate to your project directory and run:

php -S localhost:8000
This will start a server at http://localhost:8000.

This `README.md` file includes all the relevant information from your `index.html` file and is formatted appropriately for GitHub.

