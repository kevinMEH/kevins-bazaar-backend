const axios = require("axios");
const assert = require("assert");

axios.get("http://localhost:80/api/products", { params: { page: 1 }}).then( response => {
    assert.equal(8, response.data.length);
    assert.equal("premium-wood-drawers", response.data[0].url);
});

axios.get("http://localhost:80/api/products", { params: { page: 42 }}).then( response => {
    assert.deepEqual([], response.data);
});

axios.get("http://localhost:80/api/products", { params: { filter: "wOoD" }}).then( response => {
    assert.equal("premium-wood-floating-cabinet", response.data[1].url);
    assert.ok(response.data[1].name.toLowerCase().includes("wood"));
    assert.ok(response.data[2].name.toLowerCase().includes("wood"));
});

axios.get("http://localhost:80/api/product/premium-wood-drawers").then( response => {
    assert.equal("premium-wood-drawers", response.data.url);
});

axios.get("http://localhost:80/api/product/does-not-exist").then( response => {
    assert.equal(null, response.data);
})