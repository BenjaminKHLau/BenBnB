const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require("sequelize");
// const review = require('../../db/models/review');
const router = express.Router();

const validateReview = [
    check('review')
    .exists({checkFalsy:true})
    .withMessage("Review is required"),
    check('stars')
    .exists({checkFalsy:true})
    .withMessage("Rating is required"),
    handleValidationErrors
];


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
    //MAX IMAGES
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


    //EDIT A REVIEW
    router.put('/:reviewId', validateReview, requireAuth, async (req, res, next)=> {
        const id = req.params.reviewId
        const review = await Review.findByPk(id)

        if(!review){
            res.status(404)
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
              })
        }

        const updatedReview = await review.update({
            review: req.body.review,
            stars: req.body.stars,
            updatedAt: new Date(),
        })

        res.json(updatedReview)
        // res.json(review)
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

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const byebye = await Review.findByPk(req.params.reviewId)
    if(!byebye){
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    byebye.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})


module.exports = router