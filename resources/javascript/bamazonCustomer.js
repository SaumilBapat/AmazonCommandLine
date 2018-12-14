//Challenge #1: Customer View
let AmazonDB = require('./amazonDB.js');
let inquirer = require('Inquirer');

let amazonDB = new AmazonDB();
amazonDB.displayAllItems().then((result) => {
  inquirer
    .prompt([
      { type: 'input', name: 'itemId', message: 'Which item would you like to buy? (enter item id)' },
      { type: 'input', name: 'quantity', message: 'What quantity would you like to buy?' }
    ])
    .then(userInput => {
      amazonDB.buyItems(userInput.itemId, userInput.quantity).then((result) => {
        console.log(result);
        amazonDB.terminate();
      });
    });
}).catch((err) => {
  console.log(err);
});
