const db = require('./database.js');
var Table = require('cli-table');

class AmazonDB {
  constructor() {
    // Initialize the DB
    this.connection = db.initialize({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "hoginogi",
      database: "bamazon"
    });
  }

  // Query all existing products and log them
  async displayAllItems() {
    const rows =  await db.getAllItems(this.connection);
    return this.logProductRows(rows);
  }

  // Query all departments and log them
  async displayAllDepartments() {
    const rows =  await db.getAllDepartments(this.connection);
    return this.logDepartmentRows(rows);
  }

  // Query all low quantity products and log them
  async displayLowQuantityItems() {
    const rows = await db.getLowQuantityItems(this.connection);
    return this.logProductRows(rows);
  }

  // logic to buy items
  async buyItems(itemId, quantity) {
    console.log(`Attempting to buy quantity: ${quantity} of item id: ${itemId}`);
    // Check if item found
    const itemRow = await db.getItem(this.connection, itemId);
    if(itemRow.length === 0) {
      // If item not found, log error message
      return console.log('Invalid Item Id');
    } else if(parseInt(itemRow[0].stock_quantity) < parseInt(quantity)) {
      // Log if not enough stock quantity
      return console.log('Insufficient stock quantity');
    } else {
      // Update item
      const updatedQuantity = parseInt(itemRow[0].stock_quantity) - parseInt(quantity);
      var item = {stock_quantity: updatedQuantity, product_sales: itemRow[0].product_sales + quantity * itemRow[0].price};
      await db.updateItem(this.connection, item, itemId);
      let updatedItem = await db.getItem(this.connection, itemId);
      // Log updated product details
      console.log('----Updated Stock Quantity----');
      return this.logProductRows(updatedItem);
    }
  }

  // Checks if the product id provided is valid and if so, adds inventory to the product
  async addToInventory(userOptions) {
    // Query existing item
    const existingItem = await db.getItem(this.connection, userOptions.itemId);
    // Check if item found
    if(existingItem.length === 0) {
      return console.log(`Invalid item id`);
    }
    // Update quantity
    const updatedQuantity = parseInt(userOptions.quantity) + parseInt(existingItem[0].stock_quantity);
    var item = {stock_quantity: updatedQuantity };
    await db.updateItem(this.connection, item, userOptions.itemId);
    //Log the product details to the console
    return console.log(`Updated stock quantity to ${updatedQuantity} for item id ${userOptions.itemId}`);
  }

  // Created a new item with the user selection
  async addNewItem(newProduct) {
    const rows = await db.addNewItem(this.connection, newProduct);
    console.log(`Successfully added product`);
  }

  // Creates a new DB with the user selection
  async addNewDepartment(newDepartment) {
    const rows = await db.addNewDepartment(this.connection, newDepartment);
    console.log(`Successfully added department`);
  }

  // Terminates the db connection
  async terminate() {
    await db.terminate(this.connection);
  }

  // Logs the product details to the console
  logProductRows(rows) {
    var table = new Table({
      head: ['Item Id', 'Product Name', 'Department Name', 'Price'], colWidths: [20, 20, 20, 20]
    });
    rows.forEach((item) => {
      table.push([item.item_id, item.product_name, item.department_name, item.price]);
      // console.log(`Item Id: ${item.item_id}`);
      // console.log(`Product Name: ${item.product_name}`);
      // console.log(`Department Name: ${item.department_name}`);
      // console.log(`Price: ${item.price}`);
      // console.log(`Stock Quantity: ${item.stock_quantity}`);
      // console.log(`Product Sales: ${item.product_sales}`);
      // console.log(`---------------\r\n`);
    });
    console.log(table.toString());
  }

  // Logs the department details to the console
  logDepartmentRows(rows) {
    var table = new Table({
      head: ['Department Id', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profits'], colWidths: [20, 20, 20, 20, 20]
    });
    rows.forEach((item) => {
      table.push([item.department_id, item.department_name, item.over_head_costs, item.total_product_sales, item.total_product_sales - item.over_head_costs]);
      // console.log(`department_id: ${item.department_id}`);
      // console.log(`department_name: ${item.department_name}`);
      // console.log(`over_head_costs: ${item.over_head_costs}`);
      // console.log(`product_sales: ${item.total_product_sales}`);
      // console.log(`total_profit: ${item.total_product_sales - item.over_head_costs}`);
      // console.log(`Stock Quantity: ${item.stock_quantity}`);
      // console.log(`Product Sales: ${item.product_sales}`);
      // console.log(`---------------\r\n`);
    });
    console.log(table.toString());
  }
}
module.exports = AmazonDB;
