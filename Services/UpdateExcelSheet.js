const xlsx = require('xlsx');
const path = require('path');

async function updateExcelSheet( emailAddress) {
    try {
        // Path to the Excel file
        const filePath = path.join(__dirname, '../Data/Jobs.xlsx');
               
               // Read the Excel file
        const workbook = xlsx.readFile(filePath);
               
               // Get the first sheet name
        const sheetName = workbook.SheetNames[0];
               
               // Get the sheet data
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON for easier manipulation
        const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

        // Find the row with the matching jobName and update the email column
        let updated = false;
        data.forEach((row) => {
            if (row['EmailAddress'] === emailAddress) { 
                row["status"] = "Applied";
                console.log(`Updated status for jobName: ${row['EmailAddress']}`);
                updated = true;
            }
        });

        if (!updated) {
            console.log(`No matching job found for jobName: ${emailAddress}`);
            return;
        }


        // Convert JSON back to worksheet
        const newWorksheet = xlsx.utils.json_to_sheet(data);

        // Replace the old sheet with the updated one
        workbook.Sheets[sheetName] = newWorksheet;

        // Write the updated workbook back to the file
        xlsx.writeFile(workbook, filePath);

        console.log('Excel sheet updated successfully.');
    } catch (error) {
        console.error('Error updating Excel sheet:', error);
    }
}

module.exports = updateExcelSheet;