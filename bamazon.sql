DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hasbro Gaming Rubik's 3X3 Cube", "Toys & Games", 3.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jenga Classic Game", "Toys & Games", 7.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick 4K", "Electronics", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ring Video Doorbell", "Electronics", 99.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 299.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DualShock 4 Controller", "Video Games", 45.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spider-Man: Far from Home", "Movies & TV", 22.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("John Wick: Chapter 3", "Movies & TV", 17.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Abbey Road", "CDs & Vinyl", 16.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Dark Side of the Moon", "CDs & Vinyl", 25.99, 2);






