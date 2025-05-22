// utils/parseEmailContacts.js
const fs = require('fs');
const { parse } = require('csv-parse');
const XLSX = require('xlsx');

// Validate required columns in the contacts file
const validateContacts = (contacts) => {
  const requiredColumns = ['id', 'firstname', 'lastname', 'email'];
  if (contacts.length === 0) {
    throw new Error('Contacts file is empty');
  }
  const actualColumns = Object.keys(contacts[0]);
  const isValid = requiredColumns.every((col) => actualColumns.includes(col));
  if (!isValid) {
    throw new Error(
      `Invalid contacts file format. Required columns: ${requiredColumns.join(', ')}. Found: ${actualColumns.join(', ')}`
    );
  }
  return contacts;
};

// Parse contacts file (CSV or Excel)
const parseEmailContactsFile = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error('Contacts file not found'));
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const stats = fs.statSync(filePath);
    if (stats.size > MAX_FILE_SIZE) {
      reject(new Error(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`));
      return;
    }

    const ext = filePath.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      const contacts = [];
      fs.createReadStream(filePath)
        .pipe(parse({ columns: true, trim: true }))
        .on('data', (row) => contacts.push(row))
        .on('end', () => {
          if (contacts.length === 0) {
            reject(new Error('Contacts file is empty'));
          } else {
            resolve(validateContacts(contacts));
          }
        })
        .on('error', (err) => reject(err));
    } else if (ext === 'xlsx') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const contacts = XLSX.utils.sheet_to_json(sheet);
      if (contacts.length === 0) {
        reject(new Error('Contacts file is empty'));
      } else {
        resolve(validateContacts(contacts));
      }
    } else {
      reject(new Error('Unsupported file format. Only CSV and Excel files are allowed'));
    }
  });
};

module.exports = { parseEmailContactsFile };