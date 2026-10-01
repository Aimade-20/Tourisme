const {
  createGuide,
  getAllGuide,
  approveGuide,
  getAllUser,
  getAllActivities,
  getAllReservations,
  updateGuide,
  deleteGuide
} = require("../services/adminServices");
const { validationResult } = require("express-validator");

const createGuideController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const guide = await createGuide(req.body);

    return res.status(201).json({
      message: "Guide created successfully",
      guideId: guide._id,
      guide,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllGuideController = async (req, res, next) => {
  try {
    const guides = await getAllGuide();
    return res.status(200).json({
      message: "successfull",
      guides,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const approveGuidevController = async (req, res, next) => {
  try {
    const guide = await approveGuide(req.params.id);
    return res.status(200).json({
      message: "Guide approved successfully",
      guide,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateGuideController = async (req, res, next) => {
  try {
    const guide = await updateGuide(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Guide updated successfully",
      guide,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteGuideController = async (req, res, next) => {
  try {
    const result = await deleteGuide(
      req.params.id
    );

    res.status(200).json({
      message: "Guide deleted successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllUserController = async (req, res, next) => {
  try {
    const users = await getAllUser();
    return res.status(200).json({
      message: "all users",
      users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const getAllActivitiesController = async (req, res,next) => {
  try {
    const activities = await getAllActivities();

    res.status(200).json({
      activities,
    });
  } catch (error) {
   console.log(error);
    next(error);
  }
};


const getAllReservationsController = async (req, res) => {
  try {
    const reservations = await getAllReservations();

    res.status(200).json({
      reservations,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createGuideController,
  getAllGuideController,
  approveGuidevController,
  getAllUserController,
  getAllActivitiesController,
  getAllReservationsController,
  updateGuideController,
  deleteGuideController,
};
