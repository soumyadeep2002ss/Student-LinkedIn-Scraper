// Function to check if names in the CSV file match with the names on LinkedIn
function matchName(string1, string2) {
    const lowerCaseString1 = string1.toLowerCase();
    const lowerCaseString2 = string2.toLowerCase();

    const parts1 = lowerCaseString1.split(' ');
    const parts2 = lowerCaseString2.split(' ');

    const firstName1 = parts1[0];
    const firstName2 = parts2[0];

    if (firstName1 !== firstName2) {
        return false;
    }

    for (const part of parts1) {
        if (part.includes(parts2[0])) {
            return true;
        }
    }

    return false;
}

module.exports = {
    matchName
}