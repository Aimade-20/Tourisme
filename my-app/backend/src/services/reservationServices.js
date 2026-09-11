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

module.exports = createReservation