class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText
    this.currentOperandText = currentOperandText
    this.clear()
  }

  clear() {
    this.previousOperandText = ''
    this.currentOperandText = ''
    this.operation = undefined
  }

  delete() {}

  appendNumbers(number) {
    this.currentOperand = number
  }

  chooseOperation() {}

  compute() {}

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumbers(button.innerText)
    calculator.updateDisplay()
  })
})
