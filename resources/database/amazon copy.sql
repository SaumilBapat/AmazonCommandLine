-- Drops the bamazon if it exists currently
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect bamazon
USE bamazon;

-- Creates the table "products" within bamazon
CREATE TABLE products (
  -- Makes a string column called "item_id" which cannot contain null and must be unique
  item_id VARCHAR(30) NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null
  product_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "department_name" which cannot contain null
  department_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "price" which can be 6 digits long with an additional 2 decimal precision
  price DECIMAL(8,2),
  -- Makes an numeric column called "stock_quantity" which can be 6 digits long
  stock_quantity INTEGER(6)
);


-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("1", "Paper", "Supplies", 1.99, 100);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("2", "Pencil", "Supplies", 1.0, 100);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("3", "Pen", "Supplies", 4.99, 100);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("4", "Dining Table", "Furniture", 499.99, 5);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("5", "Sofa", "Furniture", 399.99, 5);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("6", "Bed", "Furniture", 799.99, 5);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("7", "Laptop", "Electronics", 999.99, 10);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("8", "Desktop", "Electronics", 1599.99, 5);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("9", "Monitor", "Electronics", 499.99, 5);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("10", "Phone", "Electronics", 899.99, 50);

UPDATE products
SET product_name = "High Quality Paper", price = 2.99
WHERE item_id = "1";
