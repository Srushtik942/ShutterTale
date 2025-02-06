const express = require('express');
const  app = express();
app.use(express.json());

app.post('/api/users',async(req,res)=>{
    try{
    let { username, email} = req.body;
    let newUser = await createNewUser({username,email});
    if(!username || !email){
     res.status(404).json({error: "Invalid Username or Email"})
    }
    res.status(200).json(newUser);
    }catch(error){
        res.status(500).json({error: "Internal server errror!"})
    }
});

const PORT = 3000

app.listen(PORT ,()=>{
    console.log(`Server is running on the port ${PORT} `);
})

module.exports = {app};