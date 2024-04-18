const Papa = require("papaparse");
const fs = require("fs");

const csvFileName = "transition.csv";

const csvData = fs.readFileSync(csvFileName, "utf-8");

const parsedData = Papa.parse(csvData);
parsedData.data.forEach((line) => {
  line[0] = parseInt(line[0])
  line[4] = parseInt(line[4])
})


class Table {
  constructor(table) {
    this.table = table;
  }

  getTransitionOutput(state, readChar) {
    const table = this.table
    for ( let i = 0 ; i < table.length ; i++){
        if ( table[i][0] === state && table[i][1] === readChar){
            return {
                writeChar: table[i][2],
                direction: table[i][3],
                outstate: table[i][4]
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
