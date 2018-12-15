const mysql = require('mysql');

function initialize(dbConfig) {
  return mysql.createConnection(dbConfig);
}

async function getAllItems(dbConnection) {
  return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM products', function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

async function getAllDepartments(dbConnection) {
  return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM departments', function(err, result) {
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
      var newItem = {
        item_id: userOptions.itemId,
        product_name: userOptions.productName,
        department_name: userOptions.departmentName,
        price: parseFloat(userOptions.price).toFixed(2),
        stock_quantity: parseInt(userOptions.stockQuantity)
      };
      dbConnection.query('INSERT INTO products SET ?', newItem, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function addNewDepartment(dbConnection, userOptions) {
  return new Promise((resolve, reject) => {
      const newDepartment = {
        department_id: userOptions.departmentId,
        department_name: userOptions.departmentName,
        over_head_costs: parseFloat(userOptions.overheadCosts).toFixed(2)
      };
      dbConnection.query('INSERT INTO departments SET ?', newDepartment, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function updateItem(dbConnection, item, itemId) {
  return new Promise((resolve, reject) => {
      dbConnection.query('UPDATE products SET ? WHERE ?', [item, { item_id: itemId }], (err, result) => {
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
  getAllDepartments,
  getLowQuantityItems,
  getItem,
  addNewItem,
  addNewDepartment,
  updateItem,
  terminate,
};
