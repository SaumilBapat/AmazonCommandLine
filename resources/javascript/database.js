const mysql = require('mysql');

function initialize(dbConfig) {
  return mysql.createConnection(dbConfig);
}

function getAllItems(dbConnection) {
  return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM products', function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function getLowQuantityItems(dbConnection) {
  console.log(`getLowQuantityItems`);
  return new Promise((resolve, reject) => {
      dbConnection.query("SELECT * FROM bamazon.products where stock_quantity <= 5;", function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function getItem(dbConnection, itemId) {
  return new Promise((resolve, reject) => {
      dbConnection.query(`SELECT * FROM products WHERE ?`,  [{item_id: itemId}], function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function addNewItem(dbConnection, userOptions) {
  return new Promise((resolve, reject) => {
      var newItem = [
        {item_id: userOptions.itemId},
        {product_name: userOptions.productName},
        {department_name: userOptions.departmentName},
        {price: parseFloat(userOptions.price).toFixed(2)},
        {stock_quantity: parseInt(userOptions.stockQuantity)}
      ];
      newItem = [
        [userOptions.itemId, userOptions.productName, userOptions.departmentName, userOptions.price, userOptions.stockQuantity]
      ];
      dbConnection.query('INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES ?', [newItem], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function updateItem(dbConnection, itemId, quantity) {
  return new Promise((resolve, reject) => {
      dbConnection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: quantity }, { item_id: itemId }], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function terminate(dbConnection) {
  return dbConnection.end();
}

module.exports = {
  initialize,
  getAllItems,
  getLowQuantityItems,
  getItem,
  addNewItem,
  updateItem,
  terminate,
};
