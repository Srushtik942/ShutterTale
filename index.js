const express = require('express');
const { createNewUser} = require('./controllers/userController');
const{searchImages} = require('./controllers/imageController');
const  app = express();
app.use(express.json());

app.post("/api/users", createNewUser);
app.get("/api/photos",searchImages);

const PORT = 3000

app.listen(PORT ,()=>{
    console.log(`Server is running on the port ${PORT} `);
})

module.exports = {app};