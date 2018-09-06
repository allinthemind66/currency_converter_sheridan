const currencyAPI = `https://free.currencyconverterapi.com/api/v6/convert?q=`;
const backendAPI = 'http://localhost:3000/currency';
const submitButton = document.querySelector('button');
const value1Select = document.querySelector('.curr_select_one');
const value2Select = document.querySelector('.curr_select_two');
const resultDiv = document.querySelector('.result');
const amountToAmountDiv = document.querySelector('.amount_to_amount');
const switchButton = document.querySelector('.switch-button');
let inputAmount = document.querySelector('.curr_input');
let value1 = value1Select.value;
let value2 = value2Select.value;
let currenctConversionRate;
inputAmount.value = 1;

getData()
// ADD EVENT LISTENERS TO BUTTON AND FIELDS
value1Select.addEventListener('change', () => {
  value1 = value1Select.value;
  getData();
});
value2Select.addEventListener('change', () => {
  value2 = value2Select.value;
  getData();
});

inputAmount.addEventListener('input', (e) => {
amountToAmountDiv.innerHTML = `<h6>${inputAmount.value} ${value1} equals ${(+currenctConversionRate) * (+inputAmount.value)} ${value2}</h6>`;
});
inputAmount.addEventListener('change', (e) => {
amountToAmountDiv.innerHTML = `<h6>${inputAmount.value} ${value1} equals ${(+currenctConversionRate) * (+inputAmount.value)} ${value2}</h6>`;
});

switchButton.addEventListener('click', () => {
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

async function getData() {
  await fetch(backendAPI)
  .then(resp => resp.json())
  .then(json => checkDataForContent(json))
};

function checkDataForContent(json){
  if(json[`${value1}_${value2}`]){
    console.log('this is the cached value', json[`${value1}_${value2}`]);
    renderData(json);
  } else{
    console.log('there is no cached value. let me fetch one for you!');
    try {
      getDataFromApi();
    } catch(error){
      console.log(error);
    }
  };
};

async function getDataFromApi(){
  await fetch(currencyAPI + `${value1}_${value2}&compact=y`)
  .then(resp => resp.json())
  .then(json => addDataToBackend(json))
};

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
  currenctConversionRate = `${json[`${value1}_${value2}`]}`;
  resultDiv.innerHTML = `<h6>The current conversion rate is ${(+json[`${value1}_${value2}`])} ${value2} per ${value1}</h6>`;
  amountToAmountDiv.innerHTML = `<h6>${inputAmount.value} ${value1} equals ${(+currenctConversionRate) * (+inputAmount.value)} ${value2}</h6>`;
}
