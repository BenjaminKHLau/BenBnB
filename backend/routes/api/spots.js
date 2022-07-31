const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image } = require('../../db/models');
// const user = require('../../db/models/user')
const router = express.Router();


router.post('/:spotId/images', requireAuth, async (req, res, next)=>{
    // DO LATER
})

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
router.post('/', requireAuth, async (req,res,next)=>{
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    // const loggeduser = await User.findByPk(User.Id)
    const loggeduser = req.user.id
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
        res.status(400)
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "address": "Street address is required",
              "city": "City is required",
              "state": "State is required",
              "country": "Country is required",
              "lat": "Latitude is not valid",
              "lng": "Longitude is not valid",
              "name": "Name must be less than 50 characters",
              "description": "Description is required",
              "price": "Price per day is required"
            }
          })
    }
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