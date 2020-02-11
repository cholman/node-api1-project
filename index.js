// implement your API here
const express = require('express');
const Users = require("./data/db.js");
const server = express();
const port = 5000;

server.use(express.json());
server.get("/", (req, res) => {
    res.json({ hello: "web 26" });

})

//get
server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
        });

})

//post
server.post("/api/users", (req, res) => {
    const {name, bio} = req.body;

    if (!name || !bio ){
        return res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    //console.log(req.body)
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
});

//get by id
server.get("/api/users/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user === undefined){
                res.status(404).json({message: "The user with the specified ID does not exist."})
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user information could not be retrieved." });
        });
})

//delete
server.delete("/api/users/:id", (req, res) => {
    Users.remove(req.params.id)
        .then(removed => {
        if(!removed){
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            });
        } else {
            res.status(200).json({message: "Account deleted."});
        }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "The user could not be removed" })
        });

        
    
});

//put 
server.put("/api/users/:id", (req, res) => {
    Users.update(req.params.id, req.body)
        .then(user => {
            if( !user ){
                res.status(404).json({
                    errorMessage: "The user with teh specified ID does not exist."
                });
            } else {
                res.status(200).json(user)
                }
        })
        .catch(err => {
            console.log(err);
            if (!req.body.name || !req.body.bio){
                res
                    .status(400)
                    .json({ errorMessage: "Please provide name and bio for the user."})
            } else {
                res.status(500).json({ errorMessage: "The user information could not be modified." });
            }
            
        });
})

server.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
})