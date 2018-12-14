let inquirer = require('inquirer');
userPrompt();

console.log('done prompt');

async function userPrompt() {
  const userInput = await inquirer.prompt([{type: 'input', name:'message', message:'Enter a word'}]);
  console.log(userInput.message);
}
