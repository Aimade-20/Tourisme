const Reservation = require("../models/Reservation")
const Activitys = require("../models/ActivitySchema")


 const createReservation = async (activityId, userId, numberOfPlaces) => {
    const activity = await Activitys.findById(activityId)
  if (!activity) {
    throw new Error ("activity not found")
  }
    if (activity.availablePlaces < numberOfPlaces ) {
        throw new Error ("Not enough available places")
    }
    activity.availablePlaces -= numberOfPlaces
   let totalPrice = activity.price * numberOfPlaces
    await activity.save()
    const reservation = await Reservation.create({
        activity : activityId,
        user : userId,
        numberOfPlaces : numberOfPlaces ,
        totalPrice : totalPrice
    })
    return reservation
}

const cancellation = async (reservationId, userId, numberOfPlaces) => {
  try {
    const reservation = await Reservation.findById(reservationId)
    if (!reservation) {
      throw new Error("reservation not found .")
    }
    if(reservation.user != userId){
      throw new Error("can not cancel this res")
    }
    if (reservation.status === "cancelled") {
      throw new Error("")
    }
  } catch (error) {
    
  }
}



module.exports = createReservation