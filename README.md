# LinkedIn Profile Scraper

This project is a LinkedIn profile scraper that extracts profile data from LinkedIn based on a CSV file containing student information. It utilizes Puppeteer, a Node.js library for controlling headless Chrome or Chromium browser, to navigate LinkedIn and scrape the required information.

## Modules

### csvReader.js

This module is responsible for reading the CSV file containing student information and converting it to JSON format.

### csvWriter.js

This module handles writing the scraped LinkedIn profile data to both JSON and CSV formats.

### linkedinUtils.js

This module includes utility functions for interacting with LinkedIn, such as scraping profile data and extracting education details.

### login.js

This module handles the login process for LinkedIn. It navigates to the LinkedIn login page and enters the user's email address and password.

### main.js

The main module orchestrates the entire scraping process. It reads the student data from the CSV file using csvReader.js, logs in to LinkedIn using login.js, and performs the LinkedIn profile scraping using linkedinUtils.js. It then writes the scraped data to JSON and CSV formats using csvWriter.js.

### nameChecker.js

This module contains helper functions to compare and match names between the CSV file and LinkedIn profiles.

## Files

### student.csv

This CSV file contains the student information, including name, email, house, year, and concentration. It serves as the input data for the LinkedIn profile scraper.

### Output Files

The scraper generates two separate output files in the Output directory:

#### linkedin_profiles.csv

This CSV file contains the scraped LinkedIn profile data. It includes columns for the student's name, email, house, year, concentration, and LinkedIn URL.

#### linkedin_profiles.json

This JSON file contains the scraped LinkedIn profile data. It is in a structured format with objects representing each student's profile, including their name, email, house, year, concentration, and LinkedIn URL.

Make sure to check the Output directory after running the scraper to access the generated output files.

## Usage

1. Install dependencies by running either `npm install` or `yarn install`.
2. Update the `student.csv` file with the relevant student information.
3. Adjust the scraping logic and functionality within the different modules as needed.
4. Run the scraper by executing the command `node main.js`.
5. Once the scraping process is complete, the scraped LinkedIn profile data will be saved in both JSON and CSV formats as `linkedin_profiles.json` and `linkedin_profiles.csv`, respectively.

## Dependencies

- Puppeteer: `npm install puppeteer` or `yarn add puppeteer`
- csv-parser: `npm install csv-parser` or `yarn add csv-parser`
- csv-writer: `npm install csv-writer` or `yarn add csv-writer`

## Notes

- Make sure to provide your LinkedIn credentials in the `login.js` module before running the scraper.
- Customize the scraping logic and data extraction in the `linkedinUtils.js` module according to your specific requirements.
