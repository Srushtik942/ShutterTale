const {user} = require('../models/users');

//controller function

const createNewUser = async(req,res)=>{
    try{
        let {username , email} = req.body;
        let newUser = await createNewUser({username,email});
        if(!username || !email){
            res.status(404).json({message: "Username and Email are required!"});
        }
        res.status(200).json(newUser);

    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {createNewUser};