var mysql = require("mysql");

var inquirer = require("inquirer");

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
Product ID:      ${res[i].item_id}
Product Name:    ${res[i].product_name}
Department Name: ${res[i].department_name}
Price:           ${res[i].price}
Stock Quanity:   ${res[i].stock_quantity}
`
            console.log(productList)
        }
        displayMessages();
    });
}

function displayMessages() {
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "What is the Product ID of the product you would like to buy?",
        },

        {
            type: "input",
            name: "productAmt",
            message: "How many units would you like to buy?"

        }
    ]).then(function (answer) {
        console.log(answer);
        connection.end();
    });
}

