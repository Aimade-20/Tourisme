const { validationResult } = require("express-validator");

const createReservation = require("../services/reservationServices")

const createReservationController = async (req , res , next) => {
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const activityId = req.params.id;
    const userId = req.user._id; 
    const { numberOfPlaces } = req.body;
    // const totalPrice = 
    const reservation = await createReservation(activityId , userId , numberOfPlaces)
    return res.status(201).json({
        message : "Reservation created successfully",
        reservationId : reservation.id,
        totalPrice : reservation.totalPrice,
        reservation
    })
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}
module.exports= createReservationController