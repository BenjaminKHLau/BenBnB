const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require("sequelize");
const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const killImage = await Image.findByPk(req.params.imageId)
    if(!killImage){
        const err = new Error("Image couldn't be found")
        err.title = "No image with that ID exists"
        err.status = 404
        err.errors = [`Image with ID ${req.params.imageId} does not exist`]
        return next(err)
    }

    killImage.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router