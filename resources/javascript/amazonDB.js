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

  displayAllItems() {
    var displayPromise = new Promise((resolve, reject) => {
      var dbPromise = db.getAllItems(this.connection);
      dbPromise.then((rows) => {
        this.logRows(rows);
        resolve('\r\n');
      }).catch((err) => {
        reject(err);
      })
    });
    return displayPromise;
  }

  displayLowQuantityItems() {
    var displayPromise = new Promise((resolve, reject) => {
      var dbPromise = db.getLowQuantityItems(this.connection);
      dbPromise.then((rows) => {
        this.logRows(rows);
        resolve('\r\n');
      }).catch((err) => {
        reject(err);
      })
    });
    return displayPromise;
  }

  buyItems(itemId, quantity) {
    console.log(`Attempting to buy quantity: ${quantity} of item id: ${itemId}`);
    var buyPromise = new Promise((resolve, reject) => {
      var dbGetPromise = db.getItem(this.connection, itemId);
      dbGetPromise.then((row) => {
        //this.logRows(row);
        if(row.length === 0) {
          resolve('Invalid itemId');
        } else if (parseInt(row[0].stock_quantity) >= parseInt(quantity)){
          let updatedQuantity = parseInt(row[0].stock_quantity) - parseInt(quantity);
          let price = parseFloat(quantity) * parseFloat(row[0].price);
          var dbUpdatePromise = db.updateItem(this.connection, itemId, updatedQuantity);
          dbUpdatePromise.then((updateResults) => {
            var dbGetUpdatedPromise = db.getItem(this.connection, itemId);
            dbGetUpdatedPromise.then((updatedRow) => {
              console.log('----Updated Stock Quantity----');
              this.logRows(updatedRow);
              resolve(`Successfully bought items for $${price.toFixed(2)}`);
            }).catch((err) => {
              reject(err);
            });
          }).catch((err) => {
            reject(err);
          })
        } else {
          resolve('Insufficient quantity');
        }
      }).catch((err) => {
        console.log(err);
        reject(err);
      })
    });
    return buyPromise;
  }

  addToInventory(userOptions) {
    var addToInventoryPromise = new Promise((resolve, reject) => {
      var fetchInventoryPromise = db.getItem(this.connection, userOptions.itemId);
      fetchInventoryPromise.then((rows) => {
        let updatedQuantity = parseInt(userOptions.quantity) + parseInt(rows[0].stock_quantity);
        var updateInventoryPromise = db.updateItem(this.connection, userOptions.itemId, updatedQuantity);
        updateInventoryPromise.then((result) => {
          console.log(`Updated stock quantity to ${updatedQuantity} for item id ${userOptions.itemId}`);
          resolve();
        }).catch((ex) => {
          reject(ex);
        });
      });
    });
    return addToInventoryPromise;
  }

  addNewItem(userOptions) {
    var displayPromise = new Promise((resolve, reject) => {
      var dbPromise = db.addNewItem(this.connection, userOptions);
      dbPromise.then((rows) => {
        console.log(`Successfully added products`);
        resolve('\r\n');
      }).catch((err) => {
        reject(err);
      })
    });
    return displayPromise;
  }

  terminate() {
    db.terminate(this.connection);
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
