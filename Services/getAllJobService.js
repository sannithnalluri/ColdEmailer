const xlsx = require('xlsx');
const path = require('path');

const getAllJobService = () => {
    try {
        // Path to the Excel file
        const filePath = path.join(__dirname, '../Data/Jobs.xlsx');
        
        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        
        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];
        
        // Get the sheet data
        const sheet = workbook.Sheets[sheetName];
        
        // Convert sheet data to JSON
        const jobs = xlsx.utils.sheet_to_json(sheet);        
        return jobs;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw new Error('Failed to get jobs from Excel file');
    }
};


module.exports = getAllJobService;