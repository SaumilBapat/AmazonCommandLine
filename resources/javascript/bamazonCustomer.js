//Challenge #1: Customer View

//Require the needed modules
let inquirer = require('Inquirer');
let AmazonDB = require('./amazonDB.js');
let amazonDB = new AmazonDB();

//The primary logic is enclosed in a main async function
try {
  main();
} catch (ex) {
  console.log(ex);
}

//Prompt customer and make db calls to buy items
async function main() {
  await amazonDB.displayAllItems();
  var userOptions = [
    {
      type: 'input',
      name: 'itemId',
      message: 'Which item would you like to buy? (enter item id)'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'What quantity would you like to buy?'
    }
  ];
  const userInput = await inquirer.prompt(userOptions);
  const result =  await amazonDB.buyItems(userInput.itemId, userInput.quantity);
  await amazonDB.terminate();
}
