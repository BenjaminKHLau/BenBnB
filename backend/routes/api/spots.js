const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review } = require('../../db/models');
// const user = require('../../db/models/user')
const router = express.Router();

const validateSpot = [
    check('address')
    .exists({ checkFalsy: true})
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

//POST IMAGE TO SPOT ID
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next)=>{
    // DO LATER
    const checker = await Spot.findByPk(req.params.spotId)
    if(!checker){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
        }

    const newImage = await Image.create({
        url: req.body.url,
        spotId: req.params.spotId,
        userId: req.user.id,
        // reviewId: 
    })
    res.json(newImage)
})

//GET SPOT BY ID
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId
    const idSpots = await Spot.findByPk(id)
    if(!idSpots){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json(idSpots)
})

//EDIT A SPOT BY ID
router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const id = req.params.spotId
    const idSpots = await Spot.findByPk(id)
    if(!idSpots){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
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

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const deleteMe = await Spot.findByPk(req.params.spotId)
    if(!deleteMe){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    deleteMe.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

//GET CURRENT USERS SPOTS
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id
    
    const loggedInSpots = await Spot.findAll({
        where: {
            ownerId: id,
        }
    })
    res.json(loggedInSpots)
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