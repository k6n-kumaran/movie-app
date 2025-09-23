import User from "../models/userModel.js"

export const addFavorite = async (req,res) => {
  try {
    const userId = req.user.id
    const {id : movieId} = req.params
    const {title,poster} = req.body

    if(!movieId || !title) return res.status(400).json({success:false,message:"Movie ID is required"})
    
    const user = await User.findById(userId)

    if(!userId) return res.status(401).json({success:false,message:"User not found"})

    const alreadyFavorite = user.favorites.some((movie) => movie.movieId === movieId)
    if(alreadyFavorite){
        return res.status(400).json({success:false,message:"Movie already in favorites"})
    }
    
    user.favorites.push({movieId,title,poster})
    await user.save()

    return res.status(200).json({success:true,message:"Movie added to favorites",favorites:user.favorites})
    } catch (error) {
         return res.status(500).json({success:false,message:error.message})   
    }
    

}

export const getFavorites = async (req,res) => {
     try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export const removeFavorites = async (req,res) => {
    try {
        const userId = req.user.id
        const {movieId} = req.params

        const user = await User.findById(userId)

        if(!user) return res.status(401).json({success:false,message:"User not found"})

        user.favorites = user.favorites.filter((movie) => movie.movieId !== movieId)
        await user.save()

        return res.status(200).json({success:true,message:"Movie removed from favorites",favorites:user.favorites})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}