// Generator Functions
function getRandomUpper() {
    // Returning a random uppercase letter using the CharCode method from the String object
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  console.log(getRandomUpper());
  function getRandomLower() {
    // Returning a random lowercase letter using the CharCode method from the String object
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  console.log(getRandomLower());
  function getRandomNumber() {
    // Returning a random number as a string using the CharCode method from the String object
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    // Or
    //(Math.floor(Math.random() * 10)).toString();
  }
  console.log(getRandomNumber());
  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    // Returning a random symbol from a string of symbol characters
    return symbols[(Math.floor(Math.random() * symbols.length))];
    // Or
    /*
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const randomSymbol = symbols[randomIndex];
    return randomSymbol
    */
  }
  console.log(getRandomSymbol());
  // Object storing all the generator functions
  const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };
  // Selecting the DOM Elements
  const resultEl = document.getElementById('result');
  const lengthEl = document.getElementById('length');
  const uppercaseEl = document.getElementById('uppercase');
  const lowercaseEl = document.getElementById('lowercase');
  const numbersEl = document.getElementById('numbers');
  const symbolsEl = document.getElementById('symbols');
  const generateEl = document.getElementById('generate');
  const clipboardEl = document.getElementById('clipboard');
  // Generate Password Function
  function generatePassword(upper, lower, number, symbol, length) {
    // A single console log can be used to display multiple values in the console
    console.log(upper, lower, number, symbol, length);
    // Create a generated password variable
    let generatedPassword = ``;
    // True values can be added to each other (Ex: true + true equals 2.) False is equal to zero (Ex: false + true equals 1.)
    const typesCount = upper + lower + number + symbol;
    console.log(typesCount);
    // If user has no types (Uppercase Letter, Numbers, etc.) selected generated password is set to an empty string
    if (typesCount === 0) {
      return '';
    }
    // Array storing the true/false values for the checkboxes
    let typesArr = [
      [`upper`, upper],
      [`lower`, lower],
      [`number`, number],
      [`symbol`, symbol]
    ];
    // console.log(typesArr);
    // Filtering out any unchecked options (Uppercase Letter, Numbers, etc.)
    // The filter method creates a new array with all elements/items that pass the test/condition in the function
    typesArr = typesArr.filter(
      // Checking if the value for each item is true or false. Removing the item from the array if it is false.
      function (item){
        console.log(item[1]);
        return item[1];
      }
    );
    // console.log(typesArr);
    // Loop that runs each generator function for all checked options. (Loop will run for an amount determined by the length and typesCount value)
    for (i = 0; i < length; i += typesCount){
      // Function runs for each item in the typesArr
      typesArr.forEach(
        function (type){
          // console.log(type[0]);
          const funcName = type[0];
          // Runs each selected function from the randomFunc object and adds that character to the generatedPassword variable
          generatedPassword += randomFunc[funcName]();
        }
      );
    }
    console.log(generatedPassword);

    
    // Removing extra characters in generatedPassword
    generatedPassword = generatedPassword.slice(0, length);
    // console.log(generatedPassword);
    // Returns the Generated Password from the function
    return generatedPassword
  }
  // generatePassword(true, true, true, true, 5);
  // Event Listener for when the "Generate Password" button is clicked
  generateEl.addEventListener('click', () => {
    // Number input returns a string data type. So parseInt is used to convert the string data type to a number
    const length = parseInt(lengthEl.value);
    // console.log(typeof length);
    // console.log(length);
    // Checking if the following options/types are selected/checked and setting the true or false values to the respective variables
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    // console.log(length, hasUpper, hasLower, hasNumber, hasSymbol);
    // generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string (A.K.A. The generated password) which is set as the innerText value for the result element/span
    resultEl.innerText = generatePassword(
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      length
    );
  });
  // Copy password to clipboard
  clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    // Setting the generated password to the password variable
    const password = resultEl.innerText;
    // Checking if password is an empty string. Ends the function if that is the case.
    if (password === ""){
      return;
    }
    // Setting the value for the textarea to the generated password
    textarea.value = password;
    const body = document.querySelector('body');
    // Adding the textarea element to the document/webpage
    body.prepend(textarea);
    // Selecting the text inside the textarea
    textarea.select();
    // Copies the selected text to the user's clipboard
    document.execCommand('copy');
    // Removes the textarea element from the document/webpage
    textarea.remove();
    // Alerts user that the password has been copied
    alert(`Your password has been copied to the clipboard!`);
    });