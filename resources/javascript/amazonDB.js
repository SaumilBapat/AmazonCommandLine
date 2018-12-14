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
    return this.logRows(rows);
  }

  async displayLowQuantityItems() {
    const rows = await db.getLowQuantityItems(this.connection);
    return this.logRows(rows);
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
      await db.updateItem(this.connection, itemId, updatedQuantity);
      let updatedItem = await db.getItem(this.connection, itemId);
      console.log('----Updated Stock Quantity----');
      return this.logRows(updatedItem);
    }
  }

  async addToInventory(userOptions) {
    const existingItem = await db.getItem(this.connection, userOptions.itemId);
    const updatedQuantity = parseInt(userOptions.quantity) + parseInt(rows[0].stock_quantity);
    await db.updateItem(this.connection, userOptions.itemId, updatedQuantity);
    console.log(`Updated stock quantity to ${updatedQuantity} for item id ${userOptions.itemId}`);
  }

  async addNewItem(newProduct) {
    const rows = await db.addNewItem(this.connection, newProduct);
    console.log(`Successfully added products`);
  }

  async terminate() {
    await db.terminate(this.connection);
  }

  logRows(rows) {
    rows.forEach((item) => {
      console.log(`Item Id: ${item.item_id}`);
      console.log(`Product Name: ${item.product_name}`);
      console.log(`Department Name: ${item.department_name}`);
      console.log(`Price: ${item.price}`);
      console.log(`Stock Quantity: ${item.stock_quantity}`);
      console.log(`---------------\r\n`);
    });
  }
}
module.exports = AmazonDB;
