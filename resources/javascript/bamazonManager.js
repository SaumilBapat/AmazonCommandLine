//Challenge #1: Customer View
let AmazonDB = require('./amazonDB.js');
let inquirer = require('Inquirer');

let amazonDB = new AmazonDB();

try {
  main();
} catch(ex) {
  console.log(ex);
}


async function main() {

  const managerOptions = [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product"
  ];

  const managerInput = await inquirer.prompt([
    { type: 'list', name: 'option', choices: managerOptions },
  ]);

  switch(managerInput.option) {

    case "View Products for Sale":
      await amazonDB.displayAllItems();
      await amazonDB.terminate();
      break;

    case "View Low Inventory":
      await amazonDB.displayLowQuantityItems();
      await amazonDB.terminate();
      break;

    case "Add to Inventory":
      addToInventory();
      break;

    case "Add New Product":
      console.log("Selected Add New Product");
      addNewProduct();
      break;
  }
}

async function addNewProduct() {
    const newProductOptions = [
      {type: 'input', name: 'itemId', message: "Enter the item id"},
      {type: 'input', name: 'productName', message: "Enter the product name"},
      {type: 'input', name: 'departmentName', message: "Enter the department name"},
      {type: 'input', name: 'price', message: "Enter the item price"},
      {type: 'input', name: 'stockQuantity', message: "Enter the stock quantity"}
    ];
    const newProduct = await inquirer.prompt(newProductOptions);
    await amazonDB.addNewItem(newProduct);
    await amazonDB.terminate();
}

async function addToInventory() {
  const addOptions = [
    {type: 'input', name: 'itemId', message: 'Enter the item id'},
    {type: 'input', name: 'quantity', message: 'Enter the quantity'}
  ];
  const userInput = await inquirer.prompt(addOptions);
  await amazonDB.addToInventory(userInput);
  await amazonDB.terminate();
}
