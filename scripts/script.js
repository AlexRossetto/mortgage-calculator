const form = document.getElementById('form')
const mortgageAmount = document.getElementById('mortgageAmount')
const mortgageAmountErrorElement = document.getElementById('mortgageAmount_error')
const mortgageTerm = document.getElementById('mortgageTerm')
const mortgageTermErrorElement = document.getElementById('mortgageTerm_error')
const interestRate = document.getElementById('interestRate')
const interestRateErrorElement = document.getElementById('interestRate_error')
const mortgageType = document.getElementById('Repayment')
const mortgageTypeErrorElement = document.getElementById('mortgageType_error')


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (mortgageAmount.value === '' || mortgageAmount.value === null) {
    mortgageAmountErrorElement.innerText = "This field is required"
  }
  if (mortgageTerm.value === '' || mortgageTerm.value === null) {
    mortgageTermErrorElement.innerText = "This field is required"
  }
  if (interestRate.value === '' || interestRate.value === null) {
    interestRateErrorElement.innerText = "This field is required"
  }
  if (mortgageType.value === '' || mortgageType.value === null) {
    mortgageTypeErrorElement.innerText = "This field is required"
  }
})


