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

  mortgageAmount.classList.remove('error');
  interestRate.classList.remove('error');
  mortgageTerm.classList.remove('error');
  
  document.getElementById('empty-results').style.display = 'flex';
  document.getElementById('results').style.display = 'none';
}

const findSelected = () => {
  let selected = document.querySelector("input[name='mortgageType']:checked");
  return selected;
}


const calcMortgage = () => {
  let monthlyPayment = 0;
  let totalRepayment = 0;
  const rate = interestRate.value / 100  
  const monthlyRate = rate / 12
  const n = mortgageTerm.value * 12

  const mortgageTypeElement = findSelected();
  
  if(mortgageTypeElement.value === 'Repayment') {

    monthlyPayment = (mortgageAmount.value * monthlyRate) / (1 - Math.pow((1 + monthlyRate), 
    - n));
    totalRepayment = monthlyPayment * n;

  } else if (mortgageTypeElement.value === 'Interest') {
    monthlyPayment = (mortgageAmount.value * rate) / 12
    totalRepayment = (monthlyPayment * mortgageTerm.value) * 12
  }

  return { monthly: monthlyPayment.toFixed(2) , total: totalRepayment.toFixed(2) }
};


clearAll.addEventListener('click', () => {
  resetValues();
})


form.addEventListener('submit', (e) => {
  let fields = [];
  e.preventDefault();
  const selectedRadio = findSelected();

  if (mortgageAmount.value === '' || mortgageAmount.value === null || mortgageAmount.value === 0) {
    mortgageAmountErrorElement.innerText = "This field is required"
    mortgageAmount.classList.add('error');
    fields.push(0)
  }
  if (mortgageTerm.value === '' || mortgageTerm.value === null || mortgageTerm.value === 0) {
    mortgageTermErrorElement.innerText = "This field is required"
    mortgageTerm.classList.add('error');
    fields.push(1)
  }
  if (interestRate.value === '' || interestRate.value === null || interestRate.value === 0) {
    interestRateErrorElement.innerText = "This field is required"
    interestRate.classList.add('error');
    fields.push(2)
  }

  if(!selectedRadio) {
    mortgageTypeErrorElement.innerText = "This field is required"
  }


  if(!fields.length && selectedRadio) {
    const mortgage = calcMortgage();

    document.getElementById('monthlyResult').innerHTML = `$ ${mortgage.monthly}`
    document.getElementById('repayResult').innerHTML = `$ ${mortgage.total}`

    document.getElementById('empty-results').style.display = 'none';
    document.getElementById('results').style.display = 'flex';
  }
})


