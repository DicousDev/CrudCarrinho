const porta = 3000;
const express = require("express");
const app = express();

app.use(express.json());

const client = require('./cliente.js');
const carrinho = require('./carrinho.js');

// Cliente
app.get("/clientes/:id", function(req, res) {
    const clientSelected = client[req.params.id];

    const object = {
        client: clientSelected,
        carrinho: carrinho[Number(clientSelected.carrinhoId)]
    }

    res.json(object);
});

app.post("/clientes", function(req, res) {
    client.push(req.body);
    res.json(req.body);
});


// Carrinho
app.get("/carrinho", function(req, res) {
    res.json(carrinho);
});

app.post("/carrinho", function(req, res) {
    carrinho.push(req.body);
    res.json(req.body);
});

app.patch("/carrinho/:id", function(req, res) {
    const novoItem = req.body;
    const id = Number(req.params.id);
    carrinho[id].carrinho = carrinho[id].carrinho.concat(novoItem.item);
    res.json(carrinho[id].carrinho);
});

app.listen(porta);