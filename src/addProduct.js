require("dotenv").config({ path: "../config.env" });
const { connectToServer, getDatabase } = require("./database/connection.js");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query) {
    return new Promise(resolve => {
        readline.question(query, resolve);
    });
}

// {
//     name: "Premium Wood Drawers", 
//     thumbnail: "https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?auto=format&fit=crop&w=1740&q=80",
//     price: "$120",
//     url: "premium-wood-drawers",
//     desc: "Drawers and side tables made from premium walnut wood, available in an assortment of shapes and sizes. Whether it's for your front porch or your study, these drawers will stand the test of time."
// },
    
async function createProduct() {
    let name = "";
    while(!name) {
        name = await question("Product name: ");
    }
    name = name.trim();

    let thumbnail = "";
    while(thumbnail.substring(0, 4) !== "http") {
        thumbnail = await question("Product image URL: ")
    }
    thumbnail = thumbnail.trim();
    
    let price = await question("Price of item: ");
    price = price.trim();
    if(price.charAt(0) !== "$") price = "$" + price;

    let url = await question("Product URL: ");
    url = url.trim();
    if(url === "") url = name.toLowerCase().split(" ").join("-");

    let desc = await question("Product Description: ");
    desc = desc.trim();
    if(desc === "") desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit ex lacus, pretium blandit orci feugiat ut. Etiam leo nibh, viverra et felis ac, feugiat laoreet augue. Duis viverra mauris et ante pellentesque facilisis.";

    return {
        name, thumbnail, price, url, desc
    };
}

connectToServer((error = false) => {
    if(error) {
        console.log(error);
        process.exit();
    }

    let collection = getDatabase().collection("products");
    createProduct().then(product => {
        collection.insertOne(product, (error, _response) => {
            if(error) throw error;
            console.log("Insert product success.");
            console.log(product);
            process.exit();
        })
    });
});