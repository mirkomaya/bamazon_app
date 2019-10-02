var mysql = require("mysql");

// var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootpass",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
  });
  
  function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      var productList = `
      Item ID: ${res[0].item_id}'

      `;

      console.log(productList);
      connection.end();
    });
  }