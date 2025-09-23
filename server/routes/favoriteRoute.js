import express from 'express'
import { addFavorite, getFavorites, removeFavorites } from '../controllers/favoriteController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/',protect,getFavorites)
router.post('/add/:id',protect,addFavorite)
router.delete('/remove/:movieId',protect,removeFavorites)

export default router 