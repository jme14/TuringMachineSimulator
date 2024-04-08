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
    this.tape = []
    for ( let i = 0 ; i < tape.length ; i++){
        if ( tape[i] === '0'){
            this.tape.push("zero")
            continue
        } else if (tape[i] === '1'){
            this.tape.push("one")
            continue
        }
        this.tape.push(tape[i])
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
    const index = this.getPointer()
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
    const isLeft = direction === -1;
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
        T.printTape();
        let finalState = T.getState()
        for (let i = 0 ; i < acceptingStates.length ; i++){
            if ( acceptingStates[i] === finalState){
                return true
            }
        }

        return false
    }

    T.printTape();
    T.writeTape(transitionOutput.writeChar);
    T.printTape();
    T.moveTape(transitionOutput.direction);
    T.setState(transitionOutput.outstate);
    T.printTape();
    console.log("----------------")
  }
}

calculate("011111111111111", [3]) ? console.log("Accepting") : console.log("Not accepting")
