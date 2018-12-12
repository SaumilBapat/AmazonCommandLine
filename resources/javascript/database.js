console.log('Initialized class');
const mysql = require('mysql');
class AmazonDB{
  constructor() {
    console.log('Running the DB!');
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "hoginogi",
      database: "bamazon"
    });
    connection.connect(function(err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
      connection.query("select * from products;", function(error, result) {
        if (error) throw error;
        result.forEach((item) => {
          console.log(`Item Id: ${item.item_id}`);
          console.log(`Product Name: ${item.product_name}`);
          console.log(`Department Name: ${item.department_name}`);
          console.log(`Price: ${item.price}`);
          console.log(`Stock Quantity: ${item.stock_quantity}`);
          console.log(`---------------\r\n`);
        });
      })
      connection.end();
    });
  }
}
module.exports = AmazonDB;
