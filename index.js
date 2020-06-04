const express = require("express")
const db = require("./database.js")

const server = express();

server.use(express.json());

//--------------------------------------------------------------------------------------------------//
//                                        POST                                                      //
//--------------------------------------------------------------------------------------------------//
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

//--------------------------------------------------------------------------------------------------//
//                                        GET                                                       //
//--------------------------------------------------------------------------------------------------//
server.get("/api/users", (req, res) => {
    const users = db.getUsers()

    if (users) {
        res.status(200).json(users)
    }
    else {
        res.status(500).json({
            message: "The user information couldn't be retrieved."
        })
    }
})

//--------------------------------------------------------------------------------------------------//
//                                      GET BY ID                                                   //
//--------------------------------------------------------------------------------------------------//
server.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        res.status(200).json(user)
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

//--------------------------------------------------------------------------------------------------//
//                                        PUT                                                       //
//--------------------------------------------------------------------------------------------------//
server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updateUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio
        })
        res.status(200).json(updateUser)
    }
    else if (!user) {
        res.status(404).json({
            message: "The use with the specified ID doesn't exist."
        })
    }
})

//--------------------------------------------------------------------------------------------------//
//                                      DELETE                                                      //
//--------------------------------------------------------------------------------------------------//
server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const deletedUser = db.deleteUser(user.id)
        res.status(200).json({
            message: "Successfully deleted use ", deletedUser
        })
    }
    else if (!user) {
        res.status(404).json({
            message: "User not found."
        })
    }
    else {
        res.status(500).json({
            message: "The user could not be removed."
        })
    }
})


const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening on https://localhost:${PORT}`);
})

