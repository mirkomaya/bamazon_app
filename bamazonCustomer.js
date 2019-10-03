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

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            var productList = `
Item ID:         ${res[i].item_id}
Product Name:    ${res[i].product_name}
Department Name: ${res[i].department_name}
Price:           ${res[i].price}
Stock Quanity:   ${res[i].stock_quantity}
`
            console.log(productList)
        }
        connection.end();
    });
}