// index.js
const puppeteer = require('puppeteer');
const csvReader = require('./csvReader');
const login = require('./login');
const linkedinUtils = require('./linkedinUtils');
const csvWriter = require('./csvWriter');
const fs = require('fs');

// Function to create the output directory if it doesn't exist
function createOutputDirectory() {
    const directory = 'Output';

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Read CSV file
        const jsonData = await csvReader.readCSVFile('student.csv');

        // Login to LinkedIn
        await login.login(page);

        const linkedInProfiles = [];
        for (const student of jsonData) {
            const profileData = await linkedinUtils.getLinkedInProfile(page, student);
            if (profileData) {
                linkedInProfiles.push({
                    Name: student.name,
                    Email: student.email,
                    House: student.house,
                    Year: student.year,
                    Concentration: student.concentration,
                    'LinkedIn URL': profileData.linkedinUrl,
                });
            }
            else {
                linkedInProfiles.push({
                    Name: student.name,
                    Email: student.email,
                    House: student.house,
                    Year: student.year,
                    Concentration: student.concentration,
                    'LinkedIn URL': "Not Found",
                });
            }
        }
        createOutputDirectory();
        // Save the LinkedIn profiles as JSON in Output/linkedin_profiles.json
        fs.writeFileSync('Output/linkedin_profiles.json', JSON.stringify(linkedInProfiles));
        // Write LinkedIn profiles to CSV as linkedin_profiles.csv
        await csvWriter.writeCSVFile('Output/linkedin_profiles.csv', linkedInProfiles);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        await browser.close();
        console.log('LinkedIn profile search completed.');
        console.log('LinkedIn profiles saved as CSV.');
    }
})();
