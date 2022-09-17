var generateBtn = document.querySelector("#generate");

let populateArray = function(start, end) {
  let numberArray = [];
  for (let i = start; i <= end; i++) {
    numberArray.push(i);
  }
  return numberArray;
}


let symbolAsciiArray1 = populateArray(33,47); 
let symbolAsciiArray2 = populateArray(58,64);
let symbolAsciiArray3 = populateArray(91,96);
let lowercaseAsciiArray = populateArray(97, 122);
let uppercaseAsciiArray = populateArray(65, 90); 
let numberAsciiArray = populateArray(48, 57);
let symbolAsciiArrayTotal = symbolAsciiArray1.concat(symbolAsciiArray2,symbolAsciiArray3); // Since there are different ranges of symbols on Ascii I populated 3 arrays and concatted them together 


let randomCharacterSelector = function (passwordGeneratorArr, passwordLen, password, preSelection) {
  for (let i = 0; i < (passwordLen - preSelection); i++) {
    let character = passwordGeneratorArr[Math.floor(Math.random() * passwordGeneratorArr.length)];
    password.push(String.fromCharCode(character));
  }
  return password;
}

// generate the password
let generatePassword = function () {
  // Sets all selects to "No" so that they can be called in the final confirmation. They are set to yes if Selected.
  let uppercaseSelect = "No";
  let lowercaseSelect = "No";
  let numberSelect = "No";
  let symbolSelect = "No";
    
  
  let passwordGeneratorArray = [];
    
  let password = [];
  let selectionCount = 0;
    
  // password length message
  let passwordLength = prompt("Enter How Many Characters the Password needs to be: (Between 8 - 128)");
   
  // Checks if there is a value within the prompt
  if (!passwordLength) {
    alert("Error. Value entered is invalid")
    return;
  }
    
  // Checks if the value is a number
  if (isNaN(passwordLength)) {
    alert("Error. Value must be a number!")
    return;
  }

   
  if (passwordLength % 1 != 0) {
    alert("Error. Value is a float. Must be an int!");
    return;
  }
    
  passwordLength = parseInt(passwordLength);
    
  
  if (passwordLength < 8 || passwordLength > 128) {
   alert("Error. Enter a number in range!")
   return;
  }

 
  if (confirm("Do you want uppercase letters?")) {
    uppercaseSelect = "Yes"; 
    selectionCount++;
    let singleCharU = uppercaseAsciiArray[Math.floor(Math.random() * uppercaseAsciiArray.length)]; 
    password.push(String.fromCharCode(singleCharU));                                               
    passwordGeneratorArray = passwordGeneratorArray.concat(uppercaseAsciiArray);
  }

  
  if (confirm("Do you want lowercase letters?")) {
    lowercaseSelect = "Yes";
    selectionCount++;
    let singleCharL = lowercaseAsciiArray[Math.floor(Math.random() * lowercaseAsciiArray.length)];
    password.push(String.fromCharCode(singleCharL));
    passwordGeneratorArray = passwordGeneratorArray.concat(lowercaseAsciiArray);
  }

  
  if (confirm("Do you want numbers in your password?")) {
    numberSelect = "Yes";
    selectionCount++;
    let singleCharN = numberAsciiArray[Math.floor(Math.random() * numberAsciiArray.length)];
    password.push(String.fromCharCode(singleCharN));
    passwordGeneratorArray = passwordGeneratorArray.concat(numberAsciiArray);
  }

  
  if (confirm("Do you want symbols in your password?")) {
    symbolSelect = "Yes";
    selectionCount++;
    let singleCharS = symbolAsciiArrayTotal[Math.floor(Math.random() * symbolAsciiArrayTotal.length)];
    password.push(String.fromCharCode(singleCharS));
    passwordGeneratorArray = passwordGeneratorArray.concat(symbolAsciiArrayTotal);
  }

  // If the user hasn't chosen any parameters for their password, they're given a warning, the program closes and they must restart the generate password process
  if (uppercaseSelect === "No" && lowercaseSelect === "No" && numberSelect === "No" && symbolSelect === "No") {
    alert("You must select at least one of the conditionals");
    return;
  }
  password = randomCharacterSelector(passwordGeneratorArray,passwordLength,password, selectionCount);

  
  password.sort(function(){return 0.5 - Math.random()});

  
  password = password.join('')
      
  
  return password;
}

// Write password to the input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);