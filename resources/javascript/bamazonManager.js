//Challenge #2: Manager View

//Require the needed modules
let inquirer = require('Inquirer');
let AmazonDB = require('./amazonDB.js');
let amazonDB = new AmazonDB();

//The primary logic is enclosed in a main async function
try {
  main();
} catch(ex) {
  console.log(ex);
}

//Prompt manager with options and switch to the right actions
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

    // The logic is enclosed in a inner function
    case "Add to Inventory":
      addToInventory();
      break;

   // The logic is enclosed in a inner function
    case "Add New Product":
      console.log("Selected Add New Product");
      addNewProduct();
      break;
  }
}

// Prompt the user for the new product details
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

//Prompt the user for the inventory details
async function addToInventory() {
  const addOptions = [
    {type: 'input', name: 'itemId', message: 'Enter the item id'},
    {type: 'input', name: 'quantity', message: 'Enter the quantity'}
  ];
  const userInput = await inquirer.prompt(addOptions);
  await amazonDB.addToInventory(userInput);
  await amazonDB.terminate();
}
