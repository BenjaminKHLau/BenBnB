const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const image = require('../../db/models/image');
const router = express.Router();

const validateSpot = [
    check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
    check('city')
    .exists({checkFalsy:true})
    .withMessage('City is required'),
    check('state')
    .exists({checkFalsy:true})
    .withMessage('State is required'),
    check('country')
    .exists({checkFalsy:true})
    .withMessage('Country is required'),
    check('lat')
    .exists({checkFalsy:true})
    .withMessage("Latitude is not valid"),
    check('lng')
    .exists({checkFalsy:true})
    .withMessage("Longitude is not valid"),
    check('name')
    .exists({checkFalsy:true})
    .isLength({max:50})
    .withMessage("Name must be less than 50 characters"),
    check('description')
    .exists({checkFalsy:true})
    .withMessage("Description is required"),
    check('price')
    .exists({checkFalsy:true})
    .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review')
    .exists({checkFalsy:true})
    .withMessage("Review is required"),
    check('stars')
    .exists({checkFalsy:true})
    .withMessage("Rating is required"),
    handleValidationErrors
];

const validateBooking = [
    check('startDate')
    .exists({checkFalsy:true})
    .isDate()
    .notEmpty()
    .withMessage("startDate cannot be empty. Cannot be greater than endDate. Format is YYYY-MM-DD"),
    check('endDate')
    .exists({checkFalsy:true})
    .isDate()
    .notEmpty()
    .withMessage("endDate cannot be empty. Format is YYYY-MM-DD"),
    handleValidationErrors
]

//GET ALL BOOKINGS BASED ON SPOT ID
//UNFINISHED
router.get('/:spotId/bookings', requireAuth, async(req,res,next)=>{
    const spotId = req.params.spotId
    const currentUser = req.user.id


    // if ownerId === spotId.ownerId
    const allBookings = await Booking.findAll({
        where: {
            spotId: spotId,
        }
    })

    res.json(allBookings)
})


//CREATE A BOOKING FROM SPOT BASED ON SPOT ID
//BOOKING CONFLICT
router.post('/:spotId/bookings', validateBooking, requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const { startDate, endDate } = req.body
    const findSpot = await Spot.findByPk(spotId)
    if(!findSpot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${spotId} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //   })
    }
    const allCurrentBookings = await Booking.findAll({
        where: {
            spotId: spotId,
            [Op.and]: [{
            startDate: {
                [Op.lte]: endDate,
            },
            }, {
            endDate: {
                [Op.gte]: startDate,
            }
            }],
        }
    });

    if(allCurrentBookings.length){
        const err = new Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = ["Start date conflicts with an existing booking",
        "End date conflicts with an existing booking"]
        return next(err)
        // res.status(403)
        // res.json({
        //     "message": "Sorry, this spot is already booked for the specified dates",
        //     "statusCode": 403,
        //     "errors": {
        //       "startDate": "Start date conflicts with an existing booking",
        //       "endDate": "End date conflicts with an existing booking"
        //     }
        // })
    }

    const newBooking = await Booking.create({
        spotId,
        startDate, 
        endDate,
        userId: req.user.id,
    })
    //if spot ownerId !== req.user.id THEN create a booking
    res.json(newBooking)
    // let createdAt = newBooking.createdAt.toISOString();
    // let updatedAt = newBooking.createdAt.toISOString();
    // createdAt = createdAt.slice(0, 10) + " " + createdAt.slice(11, 19);
    // updatedAt = updatedAt.slice(0, 10) + " " + updatedAt.slice(11, 19);
    // res.json({
    //   id: newBooking.id,
    //   spotId: newBooking.spotId,
    //   userId: newBooking.userId,
    //   startDate: newBooking.startDate,
    //   endDate: newBooking.endDate,
    //   createdAt,
    //   updatedAt,
    // });
})


//POST IMAGE TO SPOT BASED ON SPOT ID
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next)=>{
    const id = req.params.spotId
    const checker = await Spot.findByPk(req.params.spotId)
    if(!checker){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${id} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //   })
    }

    const newImage = await Image.create({
        url: req.body.url,
        spotId: req.params.spotId,
        userId: req.user.id,
        // reviewId: 
    })
    res.json({
        id: newImage.id,
        imageableId: newImage.spotId,
        url: newImage.url
    })
    // res.json(newImage)
})

//GET ALL REVIEWS BY A SPOT ID
router.get('/:spotId/reviews', async(req, res, next) => {
    const spotId = req.params.spotId
    const invalidSpot = await Spot.findByPk(spotId)
    const spotIdReviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    })
    if(!invalidSpot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${id} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //   })
    }
    res.json(spotIdReviews)
})

//POST REVIEW FOR A SPOT BASED ON SPOT ID
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next)=>{
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${spotId} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //   })
    }
    //CHECK FOR DUPLICATES TO SEE IF IT'S ALREADY REVIEWED
    const duplicates = await Review.findAll({
        where: {
            [Op.and]: [
                {userId: req.user.id},
                {spotId},
            ],
        },
    })
    if(duplicates.length >= 1){
        const err = new Error("User already has a review for this spot")
        err.status = 403
        err.errors = [`Review for Spot ID ${spotId} already exists`]
        return next(err)
        // res.status(403)
        // res.json({
        //     "message": "User already has a review for this spot",
        //     "statusCode": 403
        //   })
    }

    const newReview = await Review.create({
        review: req.body.review,
        stars: req.body.stars,
        userId: req.user.id,
        spotId: spotId,
    })
    res.status(201)
    res.json(newReview)
})


//GET CURRENT USERS SPOTS
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const id = req.user.id
    
    const loggedInSpots = await Spot.findAll({
        where: {
            ownerId: id,
        }
    })
    res.json(loggedInSpots)
})

//GET SPOT BY ID
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId
    let idSpots = await Spot.findByPk(id, {
        include: [
            {
                model: Image,
                attributes: ["id", "url"],
            },
            {
                model: User,
                as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            },
            // {
            //     model: Review,
            //     attributes: ['review']
            // }
        ]
    })
    if(!idSpots){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${id} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        // })
    }
    
    const counter = await Spot.findByPk(id, {
        // include: [
            // {
                include: 
                // [
                    {
                        model: Review,
                        attributes: [
                            // "numReviews", "avgStarRating"
                        ]
                    },
                    // ],
                    attributes: [
                    [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
                    [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
                    ],
                    raw:true
                    // },
                    // ]
    })

    let idSpotsJSON = idSpots.toJSON()
    idSpotsJSON.numReviews = counter.numReviews
    idSpotsJSON.avgStarRating = counter.avgStarRating
    res.json(idSpotsJSON)
})

//EDIT A SPOT BY ID
router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const id = req.params.spotId
    const idSpots = await Spot.findByPk(id)
    if(!idSpots){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${id} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //   })
    }
    const newSpot = await idSpots.update({
        ownerId: req.user.id,
        address,
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price,
        updatedAt: new Date(),
    })

    res.json(newSpot)
})

//DELETE SPOT BY ID
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const deleteMe = await Spot.findByPk(req.params.spotId)
    if(!deleteMe){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${id} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Spot couldn't be found",
        //     "statusCode": 404
        //   })
    }
    deleteMe.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})



//GET ALL SPOTS
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll()
    
    res.json(allSpots)
})
// const userid = User.id

//  CREATE A SPOT
router.post('/', validateSpot, requireAuth, async (req,res,next)=>{
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    // const loggeduser = await User.findByPk(User.Id)
    const loggeduser = req.user.id
    // if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
        //     res.status(400)
        //     res.json({
            //         "message": "Validation Error",
            //         "statusCode": 400,
            //         "errors": {
                //           "address": "Street address is required",
                //           "city": "City is required",
                //           "state": "State is required",
                //           "country": "Country is required",
                //           "lat": "Latitude is not valid",
                //           "lng": "Longitude is not valid",
                //           "name": "Name must be less than 50 characters",
                //           "description": "Description is required",
                //           "price": "Price per day is required"
                //         }
                //       })
                // }
                const newSpot = await Spot.create({
                    ownerId: loggeduser,
                    // user,
                    // userid,
                    address,
                    city, 
                    state, 
                    country, 
                    lat, 
                    lng, 
                    name, 
                    description, 
                    price
                })
                
                res.status(201)
                res.json(newSpot)
            })
            
            
            module.exports = router;