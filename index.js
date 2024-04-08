class Tape {
  /**
   * @param {string} inputString -- array of chars to put on tape
   */
  constructor(inputString) {
    let tape = [...inputString]
    this.setTape(tape)
    this.setState(0)
    this.setPointer(0)
  }

  /**
   * @param {char[]} tape -- array of chars, input string
   */
  setTape(tape){
    this.tape = tape
  }

  getState(){
    return this.state
  }
  /**
   * @param {int} state index of state currently at
   */
  setState(state){
    this.state = state
  }

  getPointer(){
    return this.pointer
  }
  /**
   * @param {int} pointerIndex of where we should point
   */
  setPointer(pointerIndex){
    this.pointer = pointerIndex
  }

  getCharAtPointer(){
    return this.tape[this.getPointer()]
  }
  setCharAtPointer(writeChar){
    this.tape[this.getPointer()] = writeChar
  }

  readTape(){
    const readChar = getCharAtPointer()
    return{
        startState: this.getState(),
        readChar: readChar
    }
  }

  /**
   * 
   * @param {char} writeChar 
   */
  writeTape(writeChar){
    this.setCharAtPointer(writeChar)
  }

  moveTape(direction){
    const isLeft = (direction === -1)
    if (isLeft){
        this.moveLeft()
    } else {
        this.moveRight()
    }
  }

  moveLeft(){
    const currentPointer = this.getPointer

    if ( currentPointer > 0){
        this.setPointer(currentPointer - 1)
        return
    }
    let tape = this.tape
    tape.unshift("BLANK")
    this.setTape(tape)
    return
  }

  moveRight(){
    const currentPointer = this.getPointer

    if ( currentPointer+1 < this.tape.length){
        this.setPointer(currentPointer + 1)
        return
    }
    let tape = this.tape
    tape.push("BLANK")
    this.setTape(tape)
    this.setPointer(currentPointer+1)

    return
  }
}
