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
  stock_quantity INTEGER(6),
    -- Makes an numeric column called "product_sales" which can be 6 digits long with an additional 2 decimal precision
  product_sales DECIMAL(8,2)
);


-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("1", "Paper", "Supplies", 1.99, 100, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("2", "Pencil", "Supplies", 1.0, 100, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("3", "Pen", "Supplies", 4.99, 100, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("4", "Dining Table", "Furniture", 499.99, 5, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("5", "Sofa", "Furniture", 399.99, 5, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("6", "Bed", "Furniture", 799.99, 5, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("7", "Laptop", "Electronics", 999.99, 10, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("8", "Desktop", "Electronics", 1599.99, 5, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("9", "Monitor", "Furniture", 499.99, 5, 0.00);

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES ("10", "Phone", "Electronics", 899.99, 50, 0.00);

-- Creates the table "products" within bamazon
CREATE TABLE departments (
  -- Makes a string column called "department_id" which cannot contain null and must be unique
  department_id VARCHAR(30) NOT NULL,
  -- Makes a string column called "department_name" which cannot contain null
  department_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "over_head_costs" which can be 6 digits long
  over_head_costs DECIMAL(8,2)
);

-- Creates new rows containing data in all named columns --
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("1", "Supplies", 10000.00);

-- Creates new rows containing data in all named columns --
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("1", "Furniture", 10000.00);

-- Creates new rows containing data in all named columns --
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("1", "Furniture", 10000.00);
