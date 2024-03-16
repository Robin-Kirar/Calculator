// Creating a class of calculator
class Calculator {
  constructor(
    displayPreviousElement,
    displayCurrentElement,
    displayOperatorElement
  ) {
    this.displayPreviousElement = displayPreviousElement
    this.displayCurrentElement = displayCurrentElement
    this.displayOperatorElement = displayOperatorElement

    this.clear()
  }

  clear() {
    this.previous = ''
    this.current = ''
    this.previousOperator = ''
    this.currentOperator = ''

    this.update()
  }

  delete() {
    this.current = this.current.slice(0, -1)

    this.update()
  }

  append(number) {
    if (number == '.' && this.current.includes('.')) return
    if (this.current.length <= 0) {
      if (number == '.') {
        this.current = '0'
      }
      if (number == '0') return
    }

    this.current = this.current.toString() + number.toString()

    this.update()
  }

  setOperator(operator) {
    this.previousOperator = this.currentOperator
    this.currentOperator = operator

    if (this.current == '') return this.update()

    if (this.previous == '') {
      this.previous = this.current
    } else {
      this.previous = this.compute(this.previousOperator)
    }
    this.current = ''

    this.update()
  }

  equals() {
    if (this.previous == '') return
    this.current = this.compute(this.currentOperator).toString()
    this.previous = ''
    this.previousOperator = ''
    this.currentOperator = ''
    this.update()
  }

  compute(opr) {
    let result

    switch (opr) {
      case '/':
        result = Number(this.previous) / Number(this.current)
        break
      case 'x':
        result = Number(this.previous) * Number(this.current)
        break
      case '-':
        result = Number(this.previous) - Number(this.current)
        break
      case '+':
        result = Number(this.previous) + Number(this.current)
        break
      default:
        break
    }

    return result
  }

  update() {
    this.displayPreviousElement.innerText = this.previous
    this.displayCurrentElement.innerText = this.current
    this.displayOperatorElement.innerText = this.currentOperator
  }
}

const displayPrevious = document.querySelector('[data-display-previous]')
const displayOperator = document.querySelector('[data-display-operator]')
const displayCurrent = document.querySelector('[data-display-current]')

const numberBtns = document.querySelectorAll('[data-number]')
const operatorBtns = document.querySelectorAll('[data-operator]')
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')

const calculator = new Calculator(
  displayPrevious,
  displayCurrent,
  displayOperator
)

// Clear btn
clearBtn.addEventListener('click', () => {
  calculator.clear()
})

// delete btn
deleteBtn.addEventListener('click', () => {
  calculator.delete()
})

// equals btn
equalsBtn.addEventListener('click', () => {
  calculator.equals()
})

// number btns
numberBtns.forEach((number) => {
  number.addEventListener('click', () => {
    calculator.append(number.innerText)
  })
})

// operator btns
operatorBtns.forEach((operator) => {
  operator.addEventListener('click', () => {
    calculator.setOperator(operator.innerText)
  })
})
