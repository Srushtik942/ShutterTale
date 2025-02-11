const { where } = require('sequelize');
const { users: userModel, photo:photModel} = require('../models');


// Service function to check if user exists
const doesUserExist = async (email) => {
    const user = await userModel.findOne({ where: { email } });
    return !!user;
};

// Controller function to create a new user
const createNewUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        // Validate request body
        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required!" });
        }

        // Check if user already exists
        if (await doesUserExist(email)) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Create new user
        const newUser = await userModel.create({ username, email });

        return res.status(201).json({ message: "User created successfully!", user: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error!", error: error.message });
    }
};


// Saving Photos into Collections

const savePhotos = async(req,res)=>{
    try{
        const {imageUrl, description, altDescription, tags, userId} = req.body;
        const str = 'https://images.unsplash.com/';

//imageUrl validation
        if(!imageUrl.startsWith(str)){
            return res.status(400).json({message : 'Invalid image URL'});
        }
// tags validation
        if(tags && tags.length > 5 ){
            return res.status(400).json({message:'Tags should not be more than 5'});
        }

        // ensure tags should be formatted in array
        const formattedTags = Array.isArray(tags)? tags: [];

        const newPhoto = await photModel.create({
            imageUrl,
            description,
            altDescription,
            tags : formattedTags,
            userId
        })

        return res.status(200).json({message: "Photo saved successfully!", photo: newPhoto});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!", error: error.message});
    }
}


// Adding Tags for Photos

const addTags = async(req,res)=>{
    try{
       const {photoId} = req.params;
      const {tags} = req.body;

    //   Maximum Tags:
      if(tags && tags.length>5  ){
        return res.status(400).json({message:"Tags should not be nore than 5"});
      }
      //tags validation
      if(tags.length === 0){
        return res.status(400).json({message:"Tags must be non-empty strings"});
      }

      const  photo = await photModel.findByPk(photoId);
      if(!photo){
        return res.status(404).json({message:"Photo not found!"});
      }

      const formatedTags =Array.isArray(tags)? tags:[];

      const photoUpdate = await photModel.update({
        tags: formatedTags
      },
      {
        where: {id: photoId}
      }
    );

      return res.status(200).json("Tags added succesfully!", );
    }catch(error){
        return res.status(500).json({message:"Internal server error!", error: error.message});
    }
}

module.exports = { createNewUser, savePhotos, addTags };
