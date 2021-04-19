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

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

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
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
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
    this.operation = undefined
  }

  //function that helps display proper numbers
  getDisplayNumber(number) {
    let stringNumber = number.toString()
    //getting integer
    let integer = parseFloat(stringNumber.split('.')[0])
    //getting decimals
    let decimals = stringNumber.split('.')[1]

    let integerDisplay
    if (isNaN(integer)) {
      integerDisplay = ''
    } else {
      integerDisplay = integer.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }
    if (decimals != null) {
      return `${integerDisplay}.${decimals}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(
      this.currentOperand
    )
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`
    } else {
      this.previousOperandText.innerText = ''
    }
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

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
