//Challenge #1: Customer View
let AmazonDB = require('./amazonDB.js');
let inquirer = require('Inquirer');
let amazonDB = new AmazonDB();

try {
  main();
} catch (ex) {
  console.log(ex);
}

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
