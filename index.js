const currencyAPI = `https://free.currencyconverterapi.com/api/v6/convert?q=`;
const backendAPI = 'http://localhost:3000/currency'
const submitButton = document.querySelector('button');
const value1Select = document.querySelector('.curr_select_one');
const value2Select = document.querySelector('.curr_select_two');
const resultDiv = document.querySelector('.result')
const amountToAmountDiv = document.querySelector('.amount_to_amount')
const switchButton = document.querySelector('.switch-button')
let inputAmount = document.querySelector('.curr_input')
let value1 = value1Select.value;
let value2 = value2Select.value;
let currenctConversionRate;
inputAmount.value = 1

// Get initial data
getData()
// ADD EVENT LISTENERS TO BUTTON AND FIELDS
//Whenver we change a field, we get the current conversion rate
value1Select.addEventListener('change', () => {
  value1 = value1Select.value
  getData()
});
value2Select.addEventListener('change', () => {
  value2 = value2Select.value
  getData()
});

//these two functions should not fetch data from the backend. store current conversion data locally
//whenver we switch currencies.
inputAmount.addEventListener('input', (e) => {
  // amountToAmountDiv.innerHTML = `<h4>There are ${(+currenctConversionRate) * (+inputAmount.value)} ${value2} per ${inputAmount.value} ${value1}</h4>`
amountToAmountDiv.innerHTML = `<h4>${inputAmount.value} ${value1} equals ${(+currenctConversionRate) * (+inputAmount.value)} ${value2}</h4>`
})
inputAmount.addEventListener('change', (e) => {
  // amountToAmountDiv.innerHTML = `<h4>There are ${(+currenctConversionRate) * (+inputAmount.value)} ${value2} per ${inputAmount.value} ${value1}</h4>`
amountToAmountDiv.innerHTML = `<h4>${inputAmount.value} ${value1} equals ${(+currenctConversionRate) * (+inputAmount.value)} ${value2}</h4>`
})

switchButton.addEventListener('click', () => {
  console.log('click')
  let value1Copy = value1;
  value1 = value2;
  value2 = value1Copy;
  let val1Sel = value1Select.selectedIndex;
  let val2Sel = value2Select.selectedIndex;
  let val1SelCopy = val1Sel;
  value1Select.selectedIndex = val2Sel;
  value2Select.selectedIndex = val1SelCopy;
  getData();
});

//GET ALL DATA FROM BACKEND
// TODO: MAKE THIS A LITTLE CLEANER. DO WE REALLY NEED ALL CURRENCY DATA??
async function getData() {
  await fetch(backendAPI)
  .then(resp => resp.json())
  .then(json => checkDataForContent(json))
}

function checkDataForContent(json){
  //if value is in backend json response...
  if(json[`${value1}_${value2}`]){
    //this is the value
    console.log('this is the cached value', json[`${value1}_${value2}`])
    //store current conversion rate locally so we don't have to keep calling backendAPI
    //when we change an amount input
    // currenctConversionRate = `${json[`${value1}_${value2}`]}`
    //maybe change the set value here..
    renderData(json)
  } else{
  //if not, make a call to the api
    console.log('there is no cached value. let me fetch one for you!')
    try {
      getDataFromApi()
    } catch(error){
      console.log(error)
    }
  }
}

async function getDataFromApi(){
  await fetch(currencyAPI + `${value1}_${value2}&compact=y`)
  .then(resp => resp.json())
  .then(json => addDataToBackend(json))
}

function addDataToBackend(json){
    fetch(backendAPI, {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json())
  .then(json => renderData(json))
}

function renderData(json) {
  currenctConversionRate = `${json[`${value1}_${value2}`]}`
  resultDiv.innerHTML = `<h4>The current conversion rate is ${(+json[`${value1}_${value2}`])} ${value2} per ${value1}</h4>`
  // currenctConversionRate > 1 ? amountToAmountDiv.innerHTML = `<h4>There are ${(+currenctConversionRate) * (+inputAmount.value)} ${value2} per ${inputAmount.value} ${value1}</h4>` : amountToAmountDiv.innerHTML = `<h4>There is ${(+currenctConversionRate) * (+inputAmount.value)} ${value2} per ${inputAmount.value} ${value1}</h4>`
  amountToAmountDiv.innerHTML = `<h4>${inputAmount.value} ${value1} equals ${(+currenctConversionRate) * (+inputAmount.value)} ${value2}</h4>`
}
