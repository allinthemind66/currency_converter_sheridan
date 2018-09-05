const currencyAPI = `https://free.currencyconverterapi.com/api/v6/convert?q=`;
const backendAPI = 'http://localhost:3000/currency'
const submitButton = document.querySelector('button');
const value1Select = document.querySelector('.curr_select_one');
const value2Select = document.querySelector('.curr_select_two');
const resultDiv = document.querySelector('.result')
const amountToAmountDiv = document.querySelector('.amount_to_amount')
let inputAmount = document.querySelector('.curr_input')
let value1 = value1Select.value;
let value2 = value2Select.value;

// ADD EVENT LISTENERS TO BUTTON AND FIELDS
value1Select.addEventListener('change', () => {
  value1 = value1Select.value
});
value2Select.addEventListener('change', () => {
  value2 = value2Select.value
});
inputAmount.addEventListener('input', (e) => {
  console.log(inputAmount.value)
})

submitButton.addEventListener('click', () => {
  try {
    getData()
  }
  catch(error) {
    console.log(error);
  }
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
  resultDiv.innerText = `The current conversion rate is ${(+json[`${value1}_${value2}`])} ${value2} per ${value1}`
  amountToAmountDiv.innerText = `There are ${(+json[`${value1}_${value2}`]) * (+inputAmount.value)} ${value2} per ${inputAmount.value} ${value1}`
}
