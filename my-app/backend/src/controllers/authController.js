const { validationResult } = require("express-validator");
const { register, login } = require("../services/authServices");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];

      return res.status(400).json({
        error: {
          message: firstError.msg,
          field: firstError.path,
        },
      });
    }

    const result = await register(req.body);

    return res.status(201).json({
      message: "user created successfully",
      userId: result.user._id,
      user: result.user,
      token: result.token,
    });

  } catch (error) {
    return res.status(400).json({
      error: {
        message: error.message,
        field: error.field || "general",
      },
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await login({
      email,
      password,
    });

    return res.status(200).json({
      token: result.token,
    });

  } catch (error) {
    return res.status(401).json({
      error: {
        message: error.message,
        field: error.field || "general",
      },
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};