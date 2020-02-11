// implement your API here
const express = require('express');
const Users = require("./data/db.js");
const server = express();
const port = 5000;

server.use(express.json());
server.get("/", (req, res) => {
    res.json({ hello: "web 26" });

})

server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "oops" });
        });

})

server.post("/api/users", (req, res) => {
    //console.log(req.body)
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "oops " })
        })
});

server.get("/api/users/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "oops" });
        });
})

server.delete("/api/users/:id", (req, res) => {
    Users.remove(req.params.id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "oops" });
        })
});

server.put("/api/users/:id", (req, res) => {
    Users.update(req.params.id, req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "oops" });
        });
})

server.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
})