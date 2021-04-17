class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText
    this.currentOperandText = currentOperandText
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {}

  appendNumbers(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let output
    const prev = this.previousOperand
    const current = this.currentOperand
    if (!prev || !current) return
    switch (this.operation) {
      case '+':
        output = prev + current
        break
      case '-':
        output = prev - current
        break
      case '*':
        output = prev * current
        break
      case '÷':
        output = prev / current
        break
      default:
        return
    }
    this.currentOperand = output
    this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand
    this.previousOperandText.innerText = this.previousOperand
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
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

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})
