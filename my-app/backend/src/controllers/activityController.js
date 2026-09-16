const { validationResult } = require("express-validator");
const {
  createActivity,
  getAllActivity,
  getActivityById,
  updateActivity,
  deletActivity,
  getActivitiesFilter
} = require("../services/activityServices");

const createActivityController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const activity = await createActivity(req.body, req.user._id);
    return res.status(201).json({
      message: "activity created successfully",
      activityId: activity._id,
      Activity: activity,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getAllActivityController = async (req, res, next) => {
  try {
    const activitys = await getAllActivity();
    return res.status(201).json({
      message: "successfully",
      activitys: activitys,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getActivityByIdController = async (req, res, next) => {
  try {
    const activity = await getActivityById(req.params.id);
    // console.log("activity" ,activity);
    // console.log("PARAMS:", req.params);
    // console.log("ID:", req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: "activity not found",
      });
    }
    return res.status(201).json({
      message: "successfully",
      activitys: activity,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateActivityController = async (req, res, next) => {
  try {
    const activity = await updateActivity(req.params.id , req.body);
    if (!activity) {
      return res.status(404).json({
        message: "activity not found",
      });
    }
    return res.status(201).json({
      message: "successfully",
      activitys: activity,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteActivityController = async (req ,res , next) => {
  try {
    const activity = deletActivity(req.params.id)
    console.log("PARAMS:", req.params);
    console.log("ID:", req.params.id);
    if (!activity) {
      return res.status(404).json({
        message : "activity not found"
      })
    }
    return res.status(201).json({
      message : "activity delete successfully"
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


const getActivitiesController = async (req, res, next) => {
    try {
      // console.log("QUERY:", req.query);
        const activities = await getActivitiesFilter(req.query);

        return res.status(200).json({
            message: "Activities retrieved successfully",
            activities
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
  createActivityController,
  getAllActivityController,
  getActivityByIdController,
  updateActivityController,
  deleteActivityController,
  getActivitiesController
};
