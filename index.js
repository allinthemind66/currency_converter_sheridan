// API CALL URL
//NEED TO CHECK BACKEND CACHE BEFORE CALLING THIS API
//`https://free.currencyconverterapi.com/api/v6/convert?q=${value1}_${value2}&compact=y`
let submitButton = document.querySelector('button');
// TODO: Get value when dom content loaded
let value1Select = document.querySelector('.curr_select_one');
let value2Select = document.querySelector('.curr_select_two');
let value1 = value1Select.value;
let value2 = value2Select.value;
value1Select.addEventListener('change', () => {
  console.log('value 1 is ', value1Select.value)
});
value2Select.addEventListener('change', () => {
  console.log('value 2 is ', value2Select.value)
});
submitButton.addEventListener('click', () => {
  console.log("I'm converting!");
});
