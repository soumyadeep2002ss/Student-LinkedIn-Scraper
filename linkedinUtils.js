const { matchName } = require('./nameChecker');

// Function to check if a string is a substring of another string
function isSubstring(substring, string) {
    return string.toLowerCase().includes(substring.toLowerCase());
}
// Function to get LinkedIn profile for a student
async function getLinkedInProfile(page, student) {
    const { name } = student;

    try {
        // Generate the LinkedIn search URL based on the name and college Harvard

        const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(
            name + " Harvard"
        )}&origin=GLOBAL_SEARCH_HEADER`;


        await page.goto(searchUrl);

        //if no results found save as not found
        const noResults = await page.evaluate(() => {
            return document.querySelector('.search-reusable-search-no-results') !== null;
        });

        if (noResults) {
            return null;
        }
        else {
            await page.waitForSelector('.entity-result');

            // Click the profile link
            await page.click('.entity-result__title-text a');

            // Wait for the profile page to load
            await page.waitForSelector('.pv-top-card');

            const profileData = await extractProfileData(page);
            const educationData = await getEducations(page, profileData.linkedinUrl);
            if (isSubstring('Harvard', educationData) && matchName(name, profileData.name)) {
                return profileData;
            }
            else {
                console.log("User: " + name + "Not found");
            }
        }
    } catch (error) {
        console.error(`An error occurred while finding the LinkedIn profile for ${name}:`, error);
    }
}

// Function to extract profile data from the LinkedIn profile page
async function extractProfileData(page) {
    return page.evaluate(() => {
        const data = {};
        data.name = document.querySelector('.text-heading-xlarge').innerText;
        data.headline = document.querySelector('.text-body-medium').innerText;
        data.linkedinUrl = window.location.href;
        data.photoUrl = document.querySelector('.pv-top-card__photo img')?.src;
        return data;
    });
}

const getEducations = async (page, linkedinUrl) => {
    const url = `${linkedinUrl}/details/education`;
    await page.goto(url);
    await page.waitForSelector('main');
    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight / 2);
        window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForSelector('.pvs-list');

    const positions = await page.$$('.pvs-entity');

    const textContents = [];
    for (const position of positions) {
        //remove \n and trim
        const textContent = await page.evaluate(el => el.innerText.replace(/\n/g, ' ').trim(), position);
        textContents.push(textContent);
    }
    return JSON.stringify(textContents);
}

module.exports = {
    getLinkedInProfile
}
