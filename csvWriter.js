// csvWriter.js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeCSVFile(csvFilePath, data) {
    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
            { id: 'Name', title: 'Name' },
            { id: 'Email', title: 'Email' },
            { id: 'House', title: 'House' },
            { id: 'Year', title: 'Year' },
            { id: 'Concentration', title: 'Concentration' },
            { id: 'LinkedIn URL', title: 'LinkedIn URL' },
        ],
    });

    return csvWriter.writeRecords(data);
}

module.exports = {
    writeCSVFile,
};
