import { useState, useEffect } from "react";

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
import { registerUser } from "../redux/slices/authSlice";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);


  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);


  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));


    setSuccess(false);
  };


  const handleRegister = async () => {

    setFormErrors({
      name: "",
      email: "",
      password: "",
    });


    setSuccess(false);


    const errors = {};

    // if (!formData.name.trim()) {
    //   errors.name = "Name is required";
    // }

    // if (!formData.email.trim()) {
    //   errors.email = "Email is required";
    // }

    // if (!formData.password.trim()) {
    //   errors.password = "Password is required";
    // }


    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }


    try {
      await dispatch(registerUser(formData)).unwrap();


      console.log("Register successful");

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {

      console.log("Backend error:", error);
      if (error?.error) {
        const { message, field } = error.error;

        setFormErrors({
          name: "",
          email: "",
          password: "",
          [field]: message,
        });
      }
    }
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

            transform: isLogin ? "translateX(-30px)" : "translateX(0)",

            pointerEvents: isLogin ? "none" : "auto",
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



          <Typography
            sx={{
              mb: 1,
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Button
              onClick={() => setIsLogin(true)}
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

            transform: isLogin ? "translateX(0)" : "translateX(30px)",

            pointerEvents: isLogin ? "auto" : "none",
          }}
        >


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



          <TextField
            label="Email"
            type="email"
            sx={{
              ml: 9,
              mb: 2,
              width: 350,
            }}
          />


          <TextField
            label="Password"
            type="password"
            sx={{
              mb: 3,
              width: 350,
              ml: 9,
            }}
          />



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
          >
            Login
          </Button>



          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Button
              onClick={() => setIsLogin(false)}
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
            <Typography variant="h3" fontWeight={700}>
              {isLogin ? "Welcome Back!" : "Join Rihla"}
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
