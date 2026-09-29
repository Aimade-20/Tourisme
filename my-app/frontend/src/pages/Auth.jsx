
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../redux/slices/authSlice";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  // Login / Register
  const [isLogin, setIsLogin] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Form errors
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });

  // Success message
  const [success, setSuccess] = useState(false);

  // Hide success after 3 seconds
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error of current input
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async () => {
    setFormErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });

    setSuccess(false);

    try {
      const result = await dispatch(
        registerUser(formData)
      ).unwrap();

      console.log("REGISTER RESULT:", result);

      // Save token before navigation
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      setSuccess(true);

      // After registration show login
      setTimeout(() => {
        setIsLogin(true);

        setFormData({
          name: "",
          email: formData.email,
          password: "",
        });
      }, 1000);

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      handleBackendError(error);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async () => {
    setFormErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });

    try {
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      console.log("LOGIN RESULT:", result);
      console.log("USER ROLE:", result.user?.role);

      // Save token
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // =========================
      // GUIDE
      // =========================

      if (result.user?.role === "guide") {
        navigate("/guide/activities");
        return;
      }

      // =========================
      // NORMAL USER
      // =========================

      if (redirect) {
        navigate(redirect);
        return;
      }

      navigate("/");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      handleBackendError(error);
    }
  };

  // =========================
  // HANDLE BACKEND ERROR
  // =========================

  const handleBackendError = (error) => {
    console.log("BACKEND ERROR:", error);

    /*
      Backend response example:

      {
        error: {
          message: "Email already exists",
          field: "email"
        }
      }
    */

    if (error?.error) {
      const message = error.error.message;
      const field = error.error.field;

      // General error
      if (field === "general") {
        setFormErrors({
          name: "",
          email: "",
          password: "",
          general: message,
        });

        return;
      }

      // Input error
      if (
        field === "name" ||
        field === "email" ||
        field === "password"
      ) {
        setFormErrors({
          name: "",
          email: "",
          password: "",
          general: "",
          [field]: message,
        });

        return;
      }
    }

    // Unknown error
    setFormErrors({
      name: "",
      email: "",
      password: "",
      general: "Something went wrong. Please try again.",
    });
  };

  // =========================
  // SHOW LOGIN
  // =========================

  const showLogin = () => {
    setIsLogin(true);

    setFormErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });
  };

  // =========================
  // SHOW REGISTER
  // =========================

  const showRegister = () => {
    setIsLogin(false);

    setFormErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7f6",
        boxSizing: "border-box",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "min(900px, 100%)",
          height: "min(550px, calc(100vh - 32px))",
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          boxSizing: "border-box",
        }}
      >

        {/* ========================================= */}
        {/* REGISTER */}
        {/* ========================================= */}

        <Box
          sx={{
            position: "absolute",
            width: "50%",
            height: "100%",
            left: 0,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            px: 7,

            transition: "all 0.6s ease",

            opacity: isLogin ? 0 : 1,

            transform: isLogin
              ? "translateX(-30px)"
              : "translateX(0)",

            pointerEvents: isLogin
              ? "none"
              : "auto",
          }}
        >
          {/* Logo */}

          <Typography
            variant="h4"
            fontWeight={100}
            sx={{
              mt: 4,
            }}
          >
            Rihla
          </Typography>

          {/* Title */}

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              mb: 2,
            }}
          >
            Create your account
          </Typography>

          {/* Success */}

          {success && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              sx={{
                width: 350,
                mb: 2,
                boxSizing: "border-box",
              }}
            >
              Account created successfully!
            </Alert>
          )}

          {/* General Register Error */}

          {formErrors.general && (
            <Alert
              severity="error"
              sx={{
                width: 350,
                mb: 2,
              }}
            >
              {formErrors.general}
            </Alert>
          )}

          {/* Name */}

          <TextField
            name="name"
            label="Full name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
            sx={{
              mb: 1,
              width: 350,
            }}
          />

          {/* Email */}

          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            sx={{
              mb: 1,
              width: 350,
            }}
          />

          {/* Password */}

          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            sx={{
              mb: 1,
              width: 350,
            }}
          />

          {/* Register Button */}

          <Button
            variant="contained"
            size="large"
            onClick={handleRegister}
            disabled={loading}
            sx={{
              bgcolor: "#2e7d32",

              "&:hover": {
                bgcolor: "#256628",
              },

              width: 350,
              mb: 1,
            }}
          >
            {loading ? "Creating..." : "Create account"}
          </Button>

          {/* Go Login */}

          <Typography
            sx={{
              mb: 1,
              textAlign: "center",
            }}
          >
            Already have an account?{" "}

            <Button
              onClick={showLogin}
              sx={{
                color: "#2e7d32",
                fontWeight: 700,
                textTransform: "none",
                p: 0,
                minWidth: "auto",
              }}
            >
              Login
            </Button>
          </Typography>
        </Box>

        {/* ========================================= */}
        {/* LOGIN */}
        {/* ========================================= */}

        <Box
          sx={{
            position: "absolute",
            width: "50%",
            height: "100%",
            right: 0,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            px: 7,

            transition: "all 0.6s ease",

            opacity: isLogin ? 1 : 0,

            transform: isLogin
              ? "translateX(0)"
              : "translateX(30px)",

            pointerEvents: isLogin
              ? "auto"
              : "none",
          }}
        >
          {/* Logo */}

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              mb: 1,
              ml: 9,
            }}
          >
            Rihla
          </Typography>

          {/* Title */}

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              mb: 4,
              ml: 9,
            }}
          >
            Welcome back
          </Typography>

          {/* General Login Error */}

          {formErrors.general && (
            <Alert
              severity="error"
              sx={{
                width: 350,
                ml: 9,
                mb: 2,
              }}
            >
              {formErrors.general}
            </Alert>
          )}

          {/* Email */}

          <TextField
            name="email"
            label="Email"
            type="email"
            sx={{
              ml: 9,
              mb: 2,
              width: 350,
            }}
            value={formData.email}
            onChange={handleChange}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />

          {/* Password */}

          <TextField
            name="password"
            label="Password"
            type="password"
            sx={{
              mb: 3,
              width: 350,
              ml: 9,
            }}
            value={formData.password}
            onChange={handleChange}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
          />

          {/* Login Button */}

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#2e7d32",

              "&:hover": {
                bgcolor: "#256628",
              },

              width: 350,
              ml: 9,
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Go Register */}

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}

            <Button
              onClick={showRegister}
              sx={{
                color: "#2e7d32",
                fontWeight: 700,
                textTransform: "none",
                p: 0,
                minWidth: "auto",
              }}
            >
              Register
            </Button>
          </Typography>
        </Box>

        {/* ========================================= */}
        {/* GREEN PANEL */}
        {/* ========================================= */}

        <Box
          sx={{
            position: "absolute",
            top: 0,

            left: isLogin ? 0 : "50%",

            width: "50%",
            height: "100%",

            bgcolor: "#2e7d32",

            transition: "left 0.6s ease",

            zIndex: 10,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: "white",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              px: 5,
            }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
            >
              {isLogin
                ? "Welcome Back!"
                : "Join Rihla"}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                opacity: 0.9,
              }}
            >
              {isLogin
                ? "Login to continue your journey."
                : "Create an account and start exploring."}
            </Typography>
          </Box>
        </Box>

      </Paper>
    </Box>
  );
}

