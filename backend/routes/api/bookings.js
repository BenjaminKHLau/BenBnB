const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require("sequelize");
const router = express.Router();

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


//GET ALL OF CURRENT USERS BOOKINGS
router.get('/current', restoreUser, requireAuth, async(req,res,next) => {
    const id = req.user.id
    const allBookings = await Booking.findAll({
        where: {
            userId: id
        },
        include: {
            model: Spot,
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price"]
        },
    })
    const image = await Image.findOne({
        where: {
            userId: req.user.id
        }
    })
    // console.log(image)
    // console.log(allBookings[0].dataValues)
    let arr = []
    for(let booking of allBookings){
        // console.log(booking)
        let book = booking.toJSON()
        book.Spot.previewImage = image.dataValues.url
        arr.push(book)
    }
    res.json(arr)
})


//EDIT AN EXISTING BOOKING 
router.put('/:bookingId', validateBooking, requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId
    const todaysDate = new Date()

    const goodLookingDate = `${todaysDate.toISOString().split("T")[0]} ${todaysDate.toLocaleTimeString()}`
    const currentBooking = await Booking.findByPk(bookingId)
    if(!currentBooking){
        const err = new Error("Booking couldn't be found")
        err.status = 404
        err.errors = [`Booking with ID ${req.params.bookingId} does not exist`]
        return next(err)
        // res.status(404)
        // res.json({
        //     "message": "Booking couldn't be found",
        //     "statusCode": 404
        // })
    }
    
    if(currentBooking.endDate < todaysDate){
        const err = new Error("Past bookings can't be modified")
        err.status = 403
        err.errors = [`Cannot modify Booking ID ${req.params.bookingId}`]
        return next(err)
        // res.status(403)
        // res.json({
        //     "message": "Past bookings can't be modified",
        //     "statusCode": 403
        // })
    }
    
    const {startDate, endDate} = req.body
    currentBooking.update({
        startDate,
        endDate,
        updatedAt: new Date(),
    })
    currentBooking.save()

    // let updatedAt = currentBooking.createdAt.toISOString();
    // createdAt = createdAt.slice(0, 10) + " " + createdAt.slice(11, 19);
    // updatedAt = updatedAt.slice(0, 10) + " " + updatedAt.slice(11, 19);
    
    let createdAt = `${currentBooking.createdAt.toISOString().split("T")[0]} ${currentBooking.createdAt.toLocaleTimeString()}`
    const startDateJSON = JSON.stringify(startDate).slice(1,11)
    const endDateJSON = JSON.stringify(endDate).slice(1,11)
    res.json({
        id: currentBooking.id,
        spotId: currentBooking.spotId,
        userId: currentBooking.userId,
        startDate: startDateJSON,
        endDate: endDateJSON,
        createdAt: createdAt,
        updatedAt: goodLookingDate
    })
})


// DELETE AN EXISTING BOOKING
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const bookingDie = await Booking.findByPk(req.params.bookingId)

    if(!bookingDie){
        const err = new Error("Booking couldn't be found")
        err.status = 404
        err.errors = [`Spot with ID ${req.params.bookingId} does not exist`]
        return next(err)
    }

    if(bookingDie.userId !== req.user.id){
        const err = new Error("This is not your booking")
        err.status = 403
        err.errors = [`Booking with ID ${req.params.bookingId} is not your booking`]
        return next(err)
    }

    const today = new Date()
    if(today > bookingDie.startDate){
        const err = new Error("Cannot delete Booking from the past")
        err.status = 403
        err.errors = [`Booking with ID ${req.params.bookingId} is in the past`]
        return next(err)
    }
    bookingDie.destroy() //add await if necessary
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})



module.exports = router;