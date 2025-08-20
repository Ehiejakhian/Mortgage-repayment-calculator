
/////3 characters for imput
document.getElementById('mortgage-amount').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\s/g, '') // Remove existing spaces
  let formattedValue = ''

  for (let i = 0; i < value.length; i++) {
    formattedValue += value[i]
    if ((i + 1) % 3 === 0 && (i + 1) !== value.length) {
      formattedValue += ' ' // Add space after every 3 characters
    }
  }
  e.target.value = formattedValue
})

///The divs containing the content of the two states 
const EmptyDiv = document.querySelector('.if-empty');
const notEmptyDiv = document.querySelector('.if-not-empty');

///The Inputs
let mortgageAmount = document.getElementById('mortgage-amount')
let mortgageTerm = document.getElementById('mortgage-term')
let interestRate = document.getElementById('interest-rate')
let mortgageTypeRadios = document.querySelectorAll('input[name="mortgage-type"]');
let summit = document.querySelector('#summit')

////The text Input parents
let mortgageAmountParent = document.querySelector('.mortgage-amount-parent')
let mortgageTermParent = document.querySelector('.mortgage-term-parent')
let interestRateParent = document.querySelector('.interest-rate-parent')

///Error messages
const amountError = document.querySelector('.amount-error')
const termError = document.querySelector('.term-error')
const rateError = document.querySelector('.rate-error')
const typeError = document.querySelector('.type-error')

///Unit span
const amountSpan = document.getElementById("euro-span")
const termSpan = document.getElementById("term-span")
const rateSpan = document.getElementById("rate-span")

///Clear All button functionality
document.getElementById('clear').addEventListener('click', function() {
  mortgageAmount.value = '';
  mortgageTerm.value = '';
  interestRate.value = '';
  mortgageTypeRadios.forEach(function(radio) {
    radio.checked = false;
  });
  amountError.textContent = '';
  termError.textContent = '';
  rateError.textContent = '';
  typeError.textContent = '';

  mortgageAmountParent.classList.remove('error-border');
  mortgageTermParent.classList.remove('error-border');
  interestRateParent.classList.remove('error-border');

  EmptyDiv.style.display = 'flex';
  notEmptyDiv.style.display = 'none';
});


summit.addEventListener('click', function() {
  let mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
  console.log('Mortgage Type:', mortgageType ? mortgageType.id : 'None');
  checkInputs();
});

function checkInputs() {
  let mortgageAmountisValid = true;
  let mortgageTermisValid = true;
  let interestRateisValid = true;
  let mortgageTypeisValid = true;

  // Check mortgage amount
  if (!mortgageAmount.value) {
    mortgageAmountisValid = false;
    amountError.textContent = "Please enter a valid mortgage amount."
    mortgageAmountParent.classList.add('error-border');
  }else {
    amountError.textContent = ""
    mortgageAmountParent.classList.remove('error-border');

  }

  // Check mortgage term
  if (!mortgageTerm.value) {
    mortgageTermisValid = false;
    termError.textContent = "This field is required."
    mortgageTermParent.classList.add('error-border');
  }else {
    termError.textContent = ""
    mortgageTermParent.classList.remove('error-border');
  }

  // Check interest rate
  if (!interestRate.value) {
    interestRateisValid = false;
    rateError.textContent = "This field is required."
    interestRateParent.classList.add('error-border');

  }else {
    rateError.textContent = ""
    interestRateParent.classList.remove('error-border');
  }

  // Check mortgage type
  let mortgageType = document.querySelectorAll('input[name="mortgage-type"]');
  let ismortgageTypeChecked = Array.from(mortgageType).some(radio => radio.checked);
  if (!ismortgageTypeChecked) {
    mortgageTypeisValid = false;
    typeError.textContent = "Please select a mortgage type."
  }else {
    typeError.textContent = ""
  }


  if (mortgageAmountisValid && mortgageTermisValid && interestRateisValid && mortgageTypeisValid) {
    // Proceed with the calculation
    calculateRepayments();
    notEmptyDiv.style.display = 'flex';
    EmptyDiv.style.display = 'none';
  } else {
    EmptyDiv.style.display = 'flex';
    notEmptyDiv.style.display = 'none';
  }
}

function calculateRepayments() {
  // Get the input values
  let amount = parseFloat(mortgageAmount.value.replace(/\s/g, ''));
  let term = parseInt(mortgageTerm.value);
  let rate = parseFloat(interestRate.value);
  let type = document.querySelector('input[name="mortgage-type"]:checked').id;

  if (type === 'repayment') {
    // Perform the calculation (simplified example)
    let monthlyPayment = (amount * rate / 100 / 12) / (1 - Math.pow(1 + rate / 100 / 12, -term * 12));

    let totalPayment = monthlyPayment * term * 12;

    let displayedMonthlyPay = monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let displayedTotalPay = totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Display the results
    document.querySelector('.monthly-ans').textContent = '£' + displayedMonthlyPay;
    document.querySelector('.total-ans').textContent = '£' + displayedTotalPay;


  } else if (type === 'interest-only') {
    // Interest-only mortgage calculation
    let monthlyPayment = (amount * rate / 100 / 12);
    let totalPayment = monthlyPayment * term * 12;

    let displayedMonthlyPay = monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let displayedTotalPay = totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Display the results
    document.querySelector('.monthly-ans').textContent = '£' + displayedMonthlyPay;
    document.querySelector('.total-ans').textContent = '£' + displayedTotalPay;
  }
}
