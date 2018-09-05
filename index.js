// API CALL URL
//NEED TO CHECK BACKEND CACHE BEFORE CALLING THIS API
//`https://free.currencyconverterapi.com/api/v6/convert?q=${value1}_${value2}&compact=y`
let submitButton = document.querySelector('button');
let value1;
let value2;
submitButton.addEventListener('click', () => {
  console.log("I'm converting!");
});
