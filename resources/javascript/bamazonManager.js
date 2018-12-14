//Challenge #1: Customer View
let AmazonDB = require('./amazonDB.js');
let inquirer = require('Inquirer');

let amazonDB = new AmazonDB();
var managerOptions = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];
inquirer
  .prompt([
    { type: 'list', name: 'option', choices: managerOptions },
  ])
  .then(userInput => {
    switch(userInput.option) {
      case "View Products for Sale":
        amazonDB.displayAllItems().then((result) => {
          amazonDB.terminate();
        }).catch((err) => {
          console.log(err);
        });
        break;
      case "View Low Inventory":
        amazonDB.displayLowQuantityItems().then((result) => {
          amazonDB.terminate();
        }).catch((err) => {
          console.log(err);
        });
        break;
      case "Add to Inventory":
        addToInventory();
        break;
      case "Add New Product":
        console.log("Selected Add New Product");
        addNewProduct();
        break;
    }
  });

function addNewProduct() {
    inquirer
    .prompt([
      {type: 'input', name: 'itemId', message: "Enter the item id"},
      {type: 'input', name: 'productName', message: "Enter the product name"},
      {type: 'input', name: 'departmentName', message: "Enter the department name"},
      {type: 'input', name: 'price', message: "Enter the item price"},
      {type: 'input', name: 'stock_quantity', message: "Enter the stock quantity"}
    ]).then((userInput) => {
      amazonDB.addNewItem(userInput).then((result) => {
        amazonDB.terminate();
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
}

function addToInventory() {
  inquirer
  .prompt([
    {type: 'input', name: 'itemId', message: 'Enter the item id'},
    {type: 'input', name: 'quantity', message: 'Enter the quantity'}
  ]).then((userInput) => {
      amazonDB.addToInventory(userInput).then((result) => {
        amazonDB.terminate();
      }).catch((err) => {
        console.log(err);
      });
  }).catch((err) => {
    console.log(err);
  });
}
