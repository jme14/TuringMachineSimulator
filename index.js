const transitionTable = require("./reading");

class Tape {
  /**
   * @param {string} inputString -- array of chars to put on tape
   */
  constructor(inputString) {
    let tape = [...inputString];
    this.setTape(tape);
    this.setState(0);
    this.setPointer(0);
  }

  /**
   * @param {char[]} tape -- array of chars, input string
   */
  setTape(tape) {
    this.tape = [];
    for (let i = 0; i < tape.length; i++) {
      this.tape.push(tape[i]);
    }
  }

  printTape() {
    let printString = "";
    for (let i = 0; i < this.tape.length; i++) {
      printString = printString + this.tape[i];
      if (i === this.getPointer())
        printString = printString + `(${this.getState()}) `;
      else printString = printString + " ";
    }
    console.log(printString);
  }

  printTapeSimple() {
    const copy = this.tape;
    console.log(copy.filter((item) => item !== "BLANK"));
  }

  getState() {
    return this.state;
  }
  /**
   * @param {int} state index of state currently at
   */
  setState(state) {
    this.state = state;
  }

  getPointer() {
    return this.pointer;
  }
  /**
   * @param {int} pointerIndex of where we should point
   */
  setPointer(pointerIndex) {
    this.pointer = pointerIndex;
  }

  getCharAtPointer() {
    const index = this.getPointer();
    return this.tape[index];
  }
  setCharAtPointer(writeChar) {
    this.tape[this.getPointer()] = writeChar;
  }

  readTape() {
    const readChar = this.getCharAtPointer();
    return {
      startState: this.getState(),
      readChar: readChar,
    };
  }

  /**
   *
   * @param {char} writeChar
   */
  writeTape(writeChar) {
    this.setCharAtPointer(writeChar);
  }

  moveTape(direction) {
    const isLeft = direction === "L";
    if (isLeft) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }

  moveLeft() {
    const currentPointer = this.getPointer();

    if (currentPointer > 0) {
      this.setPointer(currentPointer - 1);
      return;
    }
    let tape = this.tape;
    tape.unshift("BLANK");
    this.setTape(tape);
    return;
  }

  moveRight() {
    const currentPointer = this.getPointer();

    if (currentPointer + 1 < this.tape.length) {
      this.setPointer(currentPointer + 1);
      return;
    }
    let tape = this.tape;
    tape.push("BLANK");
    this.setTape(tape);
    this.setPointer(currentPointer + 1);

    return;
  }
}

function calculate(inputTape, acceptingStates) {
  let T = new Tape(inputTape);
  while (true) {
    let readData = T.readTape();
    let startState = readData.startState;
    let readChar = readData.readChar;

    let transitionOutput = transitionTable.getTransitionOutput(
      startState,
      readChar
    );

    if (transitionOutput === false) {
      //T.printTapeSimple();
      let finalState = T.getState();
      for (let i = 0; i < acceptingStates.length; i++) {
        if (acceptingStates[i] === finalState) {
          return true;
        }
      }

      return false;
    }

    T.printTape();
    T.writeTape(transitionOutput.writeChar);
    T.printTape();
    T.moveTape(transitionOutput.direction);
    T.setState(transitionOutput.outstate);
    T.printTape();
    //console.log("----------------")
  }
}

calculate("0011", [4])
  ? console.log("Accepting!")
  : console.log("Not accepting!");

let acceptSet = new Set();
let rejectSet = new Set();

for (let i = 0; i < 100; i++) {
  let testString = generateRandomString(
    Math.floor(Math.random() * 10) + 1,
    "01"
  );
  const result = calculate(testString, [4]);
  if (result) acceptSet.add(testString);
  else rejectSet.add(testString);
}

const acceptSetAsArray = Array.from(acceptSet).sort()
const rejectSetAsArray = Array.from(rejectSet).sort()

console.log(rejectSetAsArray);
console.log(acceptSetAsArray);

function generateRandomString(length, characters) {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

/*
function testResult(randomString, TMresult) {
  if (randomString.length % 2 === 1) {
    if (TMresult === true) {
      throw new Error(`FAILURE FOR STRING ${randomString}`);
    } else {
      return;
    }
  }

  const firstHalfString = randomString.substring(0, randomString.length / 2);
  const secondHalfString = randomString.substring(randomString.length / 2);

  const testFindings =
    firstHalfString === secondHalfString && firstHalfString.length !== 0;
  if (testFindings !== TMresult) {
    throw new Error(`FAILURE FOR STRING ${randomString}`);
  }
  console.log(`${randomString}, ${TMresult}`);
}
*/
