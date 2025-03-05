const fs = require("fs");
const { parse } = require("csv-parse");
const XLSX = require("xlsx");

const parseContactsFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const ext = filePath.split(".").pop().toLowerCase();

    if (ext === "csv") {
      const contacts = [];
      fs.createReadStream(filePath)
        .pipe(parse({ columns: true, trim: true }))
        .on("data", (row) => contacts.push(row))
        .on("end", () => resolve(contacts))
        .on("error", (err) => reject(err));
    } else if (ext === "xlsx") {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const contacts = XLSX.utils.sheet_to_json(sheet);
      resolve(contacts);
    } else {
      reject(new Error("Unsupported file format"));
    }
  });
};

module.exports = { parseContactsFile };