const { where } = require('sequelize');
const axiosInstance = require('../library/axios.lib');
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY ;
const { photo:photModel, tags: tagModel} = require('../models');

// Making API Calls to Unsplash

if(!UNSPLASH_ACCESS_KEY){
    throw new Error('Missing Unsplash Key in .env file');
}

const searchImages =  async(req,res)=>{
    try{
        const {query} = req.query;

        if(!query){
            return res.status(400).json('Query is required!');
          }

        const response = await axiosInstance.get(`https://api.unsplash.com/search/photos?query=${query}`);

        if(!response.data.results || response.data.results.length === 0){
            return res.status(404).json('No images found for the given query');
        }
        // res.json(response.data.results);


        const images = response.data.results.map((image)=>({
            imageUrl : image.urls.regular,
            description: image.description,
            altDescription: image.alt_description,
        }));
        res.json(images);
        console.log(images);

    }catch(error){
        console.error('Error fetching images:', error.message);
        res.status(500).json({error: 'Failed to fetch images'});
    }
}
// Searching Photos by Tags and Sorting by Date Saved

const searchPhotosByTags = async(req,res)=>{
    try{
        const {tag , sortOrder = 'ASC'} = req.query;

     // Tag Validation
     if(!tag){
        return res.status(400).json({message:"Tag is required for seraching query!"});
     }

     //tag exists in db or not
     const tagExist = await tagModel.findOne({where:{name: tag}});

     const photoIds = await tagExist.findByPk({photoId});

     const photos = await photModel.findAll({
        where :{
            tags:{tag}
        },
        order :[['dateSaved']]
     })
    return res.status(200).json({message:"Photos retrived successfully!",photos})

    }catch(error){
        return res.status(500).json({message:"Internal Server Error!", error: error.message});
    }
}

module.exports = {
    searchImages,
    searchPhotosByTags
}