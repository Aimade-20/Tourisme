const Reservation = require("../models/Reservation");
const Activitys = require("../models/ActivitySchema");

const createReservation = async (activityId, userId, numberOfPlaces) => {
  const activity = await Activitys.findById(activityId);
  if (!activity) {
    throw new Error("activity not found");
  }
  if (activity.availablePlaces < numberOfPlaces) {
    throw new Error("Not enough available places");
  }
  activity.availablePlaces -= numberOfPlaces;
  let totalPrice = activity.price * numberOfPlaces;
  await activity.save();
  const reservation = await Reservation.create({
    activity: activityId,
    user: userId,
    numberOfPlaces: numberOfPlaces,
    totalPrice: totalPrice,
  });
  return reservation;
};

const cancellation = async (reservationId, userId) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    throw new Error("reservation not found .");
  }
  if (reservation.user.toString() != userId.toString()) {
    throw new Error("can not cancel this res");
  }
  if (reservation.status === "cancelled") {
    throw new Error("This reservation has already been cancelled");
  }
  reservation.status = "cancelled";
  // save in mongoDb
  await reservation.save();

  const activity = await Activitys.findById(reservation.activity);
  activity.availablePlaces += reservation.numberOfPlaces;
};

const getReservationsByGuide = async ( userId) => {
  const activitys = await Activitys.find({
    guide: userId,
  });

  if (activitys.length === 0) {
    throw new Error("you do not have any activities .");
  }

  const reservations = await Reservation.find();

  const guideReservations = reservations.filter((reservation) => {
    return activitys.find(
      (activity) => activity._id.toString() === reservation.activity.toString(),
    );
  });
  console.log("guideReservations" ,guideReservations);
  
  
  if (guideReservations.length === 0) {
    throw new Error("You do not have any reservations .");
  }
  return guideReservations
};

module.exports = { createReservation, cancellation, getReservationsByGuide };
