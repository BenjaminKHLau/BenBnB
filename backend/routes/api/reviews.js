const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require("sequelize");
// const review = require('../../db/models/review');
const router = express.Router();

//ADD IMAGE TO REVIEW BASED ON REVIEW ID
router.post('/:reviewId/images', restoreUser, requireAuth, async(req, res, next) => {
    const id = req.params.reviewId
    const reviewId = await Review.findByPk(id)
    if(!reviewId){
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    const allReviewImages = await Image.findAll({
        where: {
            spotId: reviewId.spotId
        }
    })
    if(allReviewImages.length >= 10){
        res.status(403)
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    }
    const imageReview = await Image.create({
        url: req.body.url,
        spotId: reviewId.spotId,
        userId: req.user.id
    })

    res.json(imageReview)
})

//GET CURRENT USER REVIEWS
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id

    const getCurrentReviews = await Review.findAll({
        where: {
            userId: id,
        }
    })
    res.json(getCurrentReviews)
})



module.exports = router