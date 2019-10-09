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
Price:           $${res[i].price}
Stock Quanity:   ${res[i].stock_quantity}
`
            console.log(productList)
        }
        productMessage();
    });
}

function productMessage() {
    inquirer
        .prompt([{
            type: "input",
            name: "productID",
            message: "What is the 'Product ID' of the item you would like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(`

-------------------------------
Please enter a valid Product ID
-------------------------------
`)
                }
            }
        },
        {
            type: "input",
            name: "productAmt",
            message: "How many units would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log(`

------------------------------------
Please enter a valid number of units
------------------------------------
`)
                }
            }
        }
        ])
        .then(function (answer) {
            // console.log(answer.productID);
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.productID }, function (err, res) {
                if (err) throw err;
                var product = res[0];

                //                 console.log(`
                // Product Name:  ${product.product_name}
                // Price:         $${product.price}
                // Stock Quanity: ${product.stock_quantity}`);
                // Units to be purchased: ${answer.productAmt}

                var proName = product.product_name;
                var inStock = parseInt(product.stock_quantity);
                var cusUnits = parseInt(answer.productAmt);
                var proPrice = parseFloat(product.price);
                var proID = product.item_id


                if (inStock < cusUnits) {
                    console.log(`
---------------------------------------------------------
Only ${inStock} unit(s) of ${proName} left in stock!
---------------------------------------------------------
`);
                    productMessage();
                } else {
                    // console.log("We have enough items to fill your request")
                    updateDatabase(inStock, cusUnits, proPrice, proID, proName);
                };
                // connection.end();
            });
        })
}

function updateDatabase(inStock, cusUnits, proPrice, proID, proName) {
    // console.log(inStock);
    // console.log(cusUnits);
    // console.log(proPrice);

    var newStock = inStock - cusUnits;
    var cusTotal = cusUnits * proPrice;

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStock
            },
            {
                item_id: proID
            }
        ],
        function (error) {
            if (error) throw err;
            console.log(`
==================================

THANK YOU FOR SHOPPING AT BAMAZON!


Item:            ${proName}
Quantity:        ${cusUnits}

Total Purchase:  $${cusTotal}

==================================`);
            connection.end();
        }
    );
}



