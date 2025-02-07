const axiosInstance = require('../library/axios.lib');
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if(!UNSPLASH_ACCESS_KEY){
    return res.status(404).json('Missing Unsplash Key in .env file');
}


const searchImages =  async(req,res)=>{
    try{
        const {query} = req.query;

        if(!query){
            return res.status(400).json('Query is required!');
          }

        const response = await axiosInstance.get(`/photos/search?query=${query}`);

        if(!response.data || response.data.length === 0){
            return res.status(429).json('No images found for the given query');
        }
        res.json(response.data);


        // console.log(response.data);

        // const images = response.data.map((image)=>({
        //     imageUrl : image.
        // }))

    }catch(error){
        res.status(500).json({error: 'Failed to fetch images'});
    }
}

module.exports = {
    searchImages,
}