# this script:
# extracts the city data from a big json file of countries
# order the list of cities by name alphabetically in ascending order
# and breaks them in mutiple files based on the first letter

import json 
import re

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def extract_cities(data):
    extracted_cities = []
    for country in data:
        for city in country['cities']:
            extracted_city = {
                'id': city['id'],
                'name': city['name'],
                'latitude': city['latitude'],
                'longitude': city['longitude'],
                'country' : country['name'], #included country name and id with the city
                'country_id' : country['id']
            }
            extracted_cities.append(extracted_city)
    return extracted_cities

def split_data_by_first_letter(data):
    pattern = r'^[a-zA-Z]'#check if the first letter is not a special character
    split_data = {}

    for item in data:

        name = item['name'].lower()
        match = re.match(pattern, name)

        if match:
            first_letter = match.group()
            if first_letter not in split_data:
                split_data[first_letter] = []
            split_data[first_letter].append(item)
        else: #for special characters
            if 'other' not in split_data:
                split_data['other'] = []
            split_data['other'].append(item)
            
    return split_data           

def save_json(data_dict, output_prefix):
    for key, value in data_dict.items():
        file_path = f"{output_prefix}_{key}.json"
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(value, f, indent=4, ensure_ascii=False)
        print(f"Saved {file_path}")

def main(input_file, output_prefix):
    data = load_json(input_file)
    extracted_cities = extract_cities(data)
    ordered_cities = sorted(extracted_cities, key=lambda city: city['name'].lower()) # sort list by city name asc
    split_cities_dict = split_data_by_first_letter(ordered_cities)
    save_json(split_cities_dict, output_prefix)

if __name__ == "__main__":
    input_file = '../countries+cities.json'  # Path to the input JSON file
    output_prefix = 'cities'  # Prefix for the output JSON files
    main(input_file, output_prefix)
