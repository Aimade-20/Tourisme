const { validationResult } = require("express-validator");

const {createReservation , cancellation, getReservationsByGuide} = require("../services/reservationServices")


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

const cancellationController = async (req ,res ,next) => {
    try {
        const reservationId = req.params.id
        const userId = req.user._id
        const cancellationResult  = await cancellation(reservationId , userId)
        return res.status(201).json({
            message : "the resrvation is cancelled",
            reservation: cancellationResult
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const getReservationsByGuideController = async (req ,res ,next) => {
    try {
        const guideId = req.user._id
        console.log("guideId hhh" ,guideId);
        
        const getReservation = await getReservationsByGuide(guideId)
        console.log("getReservation" ,getReservation);
        
        return res.status(200).json({
            message : "Reservations retrieved successfully",
            reservation : getReservation
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports= {createReservationController ,cancellationController,getReservationsByGuideController}