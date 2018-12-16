const db = require('./database.js');
class AmazonDB {
  constructor() {
    this.connection = db.initialize({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "hoginogi",
      database: "bamazon"
    });
  }

  async displayAllItems() {
    const rows =  await db.getAllItems(this.connection);
    return this.logProductRows(rows);
  }

  async displayAllDepartments() {
    const rows =  await db.getAllDepartments(this.connection);
    return this.logDepartmentRows(rows);
  }

  async displayLowQuantityItems() {
    const rows = await db.getLowQuantityItems(this.connection);
    return this.logProductRows(rows);
  }

  async buyItems(itemId, quantity) {
    console.log(`Attempting to buy quantity: ${quantity} of item id: ${itemId}`);
    const itemRow = await db.getItem(this.connection, itemId);
    if(itemRow.length === 0) {
      return console.log('Invalid Item Id');
    } else if(parseInt(itemRow[0].stock_quantity) < parseInt(quantity)) {
      return console.log('Insufficient stock quantity');
    } else {
      const updatedQuantity = parseInt(itemRow[0].stock_quantity) - parseInt(quantity);
      var item = {stock_quantity: updatedQuantity, product_sales: itemRow[0].product_sales + quantity * itemRow[0].price};
      await db.updateItem(this.connection, item, itemId);
      let updatedItem = await db.getItem(this.connection, itemId);
      console.log('----Updated Stock Quantity----');
      return this.logProductRows(updatedItem);
    }
  }

  async addToInventory(userOptions) {
    const existingItem = await db.getItem(this.connection, userOptions.itemId);
    const updatedQuantity = parseInt(userOptions.quantity) + parseInt(rows[0].stock_quantity);
    var item = {stock_quantity: updatedQuantity };
    await db.updateItem(this.connection, item, userOptions.itemId);
    console.log(`Updated stock quantity to ${updatedQuantity} for item id ${userOptions.itemId}`);
  }

  async addNewItem(newProduct) {
    const rows = await db.addNewItem(this.connection, newProduct);
    console.log(`Successfully added product`);
  }

  async addNewDepartment(newDepartment) {
    const rows = await db.addNewDepartment(this.connection, newDepartment);
    console.log(`Successfully added department`);
  }

  async terminate() {
    await db.terminate(this.connection);
  }

  logProductRows(rows) {
    rows.forEach((item) => {
      console.log(`Item Id: ${item.item_id}`);
      console.log(`Product Name: ${item.product_name}`);
      console.log(`Department Name: ${item.department_name}`);
      console.log(`Price: ${item.price}`);
      // console.log(`Stock Quantity: ${item.stock_quantity}`);
      // console.log(`Product Sales: ${item.product_sales}`);
      console.log(`---------------\r\n`);
    });
  }

  logDepartmentRows(rows) {
    rows.forEach((item) => {
      console.log(`department_id: ${item.department_id}`);
      console.log(`department_name: ${item.department_name}`);
      console.log(`over_head_costs: ${item.over_head_costs}`);
      console.log(`product_sales: ${item.total_product_sales}`);
      console.log(`total_profit: ${item.total_product_sales - item.over_head_costs}`);
      // console.log(`Stock Quantity: ${item.stock_quantity}`);
      // console.log(`Product Sales: ${item.product_sales}`);
      console.log(`---------------\r\n`);
    });
  }
}
module.exports = AmazonDB;
