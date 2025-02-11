const express = require('express');
const { createNewUser} = require('./controllers/userController');
const{searchImages} = require('./controllers/imageController');
const {savePhotos} = require('./controllers/userController');
const {addTags} = require('./controllers/userController');
const {searchPhotosByTags} = require('./controllers/imageController')
const  app = express();
app.use(express.json());

app.post("/api/users", createNewUser);
app.get("/api/search/photos",searchImages);
app.post('/api/photos',savePhotos);
app.post('/api/:photoId/tags',addTags);
app.get('/api/photos/tag/search',searchPhotosByTags);
// app.get('/api/search-history',trackHistory);

const PORT = 3000

app.listen(PORT ,()=>{
    console.log(`Server is running on the port ${PORT} `);
})

module.exports = {app};