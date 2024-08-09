const form = document.getElementById('form')
const mortgageAmount = document.getElementById('mortgageAmount')
const mortgageAmountErrorElement = document.getElementById('mortgageAmount_error')
const mortgageTerm = document.getElementById('mortgageTerm')
const mortgageTermErrorElement = document.getElementById('mortgageTerm_error')
const interestRate = document.getElementById('interestRate')
const interestRateErrorElement = document.getElementById('interestRate_error')
const mortgageType = document.querySelectorAll("input[name='mortgageType']")
const mortgageTypeErrorElement = document.getElementById('mortgageType_error')
const clearAll = document.getElementById('clearAll')
const icons = document.querySelectorAll("#icon")

const resetValues = () => {
   mortgageAmount.value = null
   mortgageAmountErrorElement.innerText = ''
   mortgageTerm.value = null
   mortgageTermErrorElement.innerText = ''
   interestRate.value = null
   interestRateErrorElement.innerText = ''
   mortgageType.forEach((radio) => {
     radio.checked = false;
   })
   mortgageTypeErrorElement.innerText = ''

   icons.forEach((icon) => {
     icon.style.color = 'black';
     icon.style.background = 'var(--slate-100)';
   })
}

const findSelected = () => {
  let selected = document.querySelector("input[name='mortgageType']:checked");
  return selected;
}

const setColors = (event, field) => {
  if(event === 'error') {
    icons.forEach((icon, idx) => {
      if(field.includes(idx)) {
        icon.style.color = 'white';
        icon.style.background = 'var(--red)';
      }
    })
  }
}


const calcMortgage = () => {
  let monthlyPayment = 0;
  let totalRepayment = 0;

  if(mortgageType.value === 'repayment') {
    const monthlyRate = interestRate.value / 12
    const n = mortgageTerm.value * 12

    monthlyPayment = (mortgageAmount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), - n))
    totalRepayment = monthlyPayment * n
  } else if (mortgageType.value === 'interest') {
    monthlyPayment = (amount * rate) / 12
    totalRepayment = monthlyPayment * mortgageTerm.value * 12
  }

  return { monthly: monthlyPayment , total: totalRepayment }
};


clearAll.addEventListener('click', () => {
  resetValues();
})


form.addEventListener('submit', (e) => {
  let fields = [];
  e.preventDefault();
  const selectedRadio = findSelected();

  if (mortgageAmount.value === '' || mortgageAmount.value === null) {
    mortgageAmountErrorElement.innerText = "This field is required"
    fields.push(0)
  }
  if (mortgageTerm.value === '' || mortgageTerm.value === null) {
    fields.push(1)
    mortgageTermErrorElement.innerText = "This field is required"
  }
  if (interestRate.value === '' || interestRate.value === null) {
    fields.push(2)
    interestRateErrorElement.innerText = "This field is required"
  }

  if(!selectedRadio) {
    mortgageTypeErrorElement.innerText = "This field is required"
  }
  
  if(fields.length) setColors('error',fields);

  if(!fields.length && selectedRadio) {
    const mortgage = calcMortgage()

    console.log(mortgage)
  }

})


