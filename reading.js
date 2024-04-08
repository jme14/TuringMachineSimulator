const Papa = require("papaparse");
const fs = require("fs");

const csvFileName = "transition.csv";

const csvData = fs.readFileSync(csvFileName, "utf-8");

const parsedData = Papa.parse(csvData, {
  dynamicTyping: (field) => {
    // Check if the field is enclosed in quotes
    if (/^".*"$/.test(field)) return false; // Keep quoted fields as strings
    return true; // Convert other fields to numbers
  },
});


class Table {
  constructor(table) {
    this.table = table;
  }

  getTransitionOutput(state, readChar) {
    const table = this.table
    for ( let i = 0 ; i < table.length ; i++){
        if ( table[i][0] === state && table[i][1] === readChar){
            return {
                outstate: table[i][2],
                writeChar: table[i][3],
                direction: table[i][4]
            }
        }
    }
    return false
  }

  printTable(){
    console.log(this.table)
  }
}

module.exports = new Table(parsedData.data)
