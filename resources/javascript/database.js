// This file contains the base level DB calls
const mysql = require('mysql');
// Initialize the db
function initialize(dbConfig) {
  return mysql.createConnection(dbConfig);
}
// Query all the products from the db and return a promise with the results
async function getAllItems(dbConnection) {
  return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM products', function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

// Query all the departmetns from the db, aggregate the total product sales, and return a promise with the results
async function getAllDepartments(dbConnection) {
  return new Promise((resolve, reject) => {
      dbConnection.query(`
SELECT bamazon.departments.department_name, bamazon.departments.department_id,
SUM(bamazon.products.product_sales) AS total_product_sales, MAX(bamazon.departments.over_head_costs) AS over_head_costs
FROM bamazon.departments
INNER JOIN bamazon.products ON bamazon.departments.department_name=bamazon.products.department_name
GROUP BY bamazon.departments.department_name, bamazon.departments.department_id
ORDER BY bamazon.departments.department_id;`, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

// Query and return all low quantity products
function getLowQuantityItems(dbConnection) {
  console.log(`getLowQuantityItems`);
  return new Promise((resolve, reject) => {
      dbConnection.query("SELECT * FROM bamazon.products where stock_quantity <= 5;", function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

// Fetch a product from the DB
function getItem(dbConnection, itemId) {
  return new Promise((resolve, reject) => {
      dbConnection.query(`SELECT * FROM products WHERE ?`,  [{item_id: itemId}], function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

// Add a new product to the db
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

// Add a department to the db
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

// Update a product in the db
function updateItem(dbConnection, item, itemId) {
  return new Promise((resolve, reject) => {
      dbConnection.query('UPDATE products SET ? WHERE ?', [item, { item_id: itemId }], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
}

// Terminate the db connection
function terminate(dbConnection) {
  return dbConnection.end();
}

// Export all the methods in the file
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
