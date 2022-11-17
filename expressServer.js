const express = require('express');
const {restart} = require('nodemon');
const cors = require('cors');
const app = express();
const {Client} = require('pg');
const PORT = 6000;

app.use(express.json());
app.use(cors());

const client = new Client({
    connectionString: "postgresql://postgres:docker@localhost:5432/tacos"
});

client.connect();

app.get('/', function (req, res) {
    res.send("Hello, world!");
});

app.get('/tacos', (req,res) => {
    client.query('SELECT * FROM taco', function (err, result) {
        if (err) {
            console.error(err)
        } else {
            res.status(200).send(result.rows);
        }
    })
});

app.get('/tacos/:tacoid', (req,res) => {
    client.query('SELECT * FROM taco WHERE tacoid = $1', [req.params.tacoid], function (err, result) {
        if (err) {
            console.error(err)
        } else {
            res.status(200).send(result.rows);
        }
    })
});

app.post('/tacos', (req,res) => {
    let {name, ingredient} = req.body;
    client.query ('INSERT INTO taco (name, ingredient) VALUES ($1, $2);', [name, ingredient], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(201).send(results.rows);
        }
     })
});

app.patch('/tacos/:tacoid', (req,res) => {
    client.query('UPDATE taco SET qty = $1 WHERE id = $2', [req.body.ingredient, req.params.tacoid], (error, results) => {
        if(error) {
            console.error(error)
        } else {
             res.status(200).send(results.rows);
        }
    })
});

app.delete('/tacos/:id', (req,res) => {
    client.query('DELETE FROM tacos WHERE id = $1', [req.params.id], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.send (results.rows);
        }
    })
});


app.listen(PORT, () => {
    console.log(`Idris' Tacos on ${PORT}`)
});