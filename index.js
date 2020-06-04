const express = require("express")
const db = require("./database.js")

const server = express();

server.use(express.json());

// --------------------------------------------------------------------------------------------------
//                                         POST
// --------------------------------------------------------------------------------------------------
server.post("/api/users", (req, res) => {

    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser)
})


// --------------------------------------------------------------------------------------------------
//                                         GET
// --------------------------------------------------------------------------------------------------
server.get("/api/users", (req, res) => {
    const users = db.getUsers()

    if (users) {
        res.json(users)
    }
    else {
        res.status(500).json({
            message: "The user information couldn't be retrieved."
        })
    }
})

// --------------------------------------------------------------------------------------------------
//                                       GET BY ID
// --------------------------------------------------------------------------------------------------
server.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    }
    else if (!user) {
        res.status(404).json({
            message: "The user with the specified ID doesn not exist."
        })
    }
    else {
        res.status(500).json({
            message: "The user information couldn't be retrieved."
        })
    }
})

// --------------------------------------------------------------------------------------------------
//                                         PUT
// --------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------
//                                       DELETE
// --------------------------------------------------------------------------------------------------

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening on https://localhost:${PORT}`);
})

