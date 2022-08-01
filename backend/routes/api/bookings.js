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
        }
    })
    res.json(allBookings)
})


//EDIT AN EXISTING BOOKING 
router.put('/:bookingId', validateBooking, requireAuth, async (req, res, next) => {
    const {startDate, endDate} = req.body
    const bookingId = req.params.bookingId
    const todaysDate = new Date()
    // const today = todaysDate.slice(0, 10)

    const currentBooking = await Booking.findByPk(bookingId)
    if(currentBooking.endDate < todaysDate){
        res.status(403)
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    if(!currentBooking){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    currentBooking.update({
        startDate,
        endDate,
        updatedAt: new Date(),
    })
    currentBooking.save()
    res.json(currentBooking)
})


module.exports = router;