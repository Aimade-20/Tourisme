import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createGuide } from "../redux/slices/adminSlice";

export default function CreateGuide() {
  const dispatch = useDispatch();

  const {error , loading } = useSelector((state) => state.admin);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");

  // Get values from inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Hide success message when user starts editing again
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    const result = await dispatch(createGuide(formData));

    // Only show success if backend request succeeded
    if (createGuide.fulfilled.match(result)) {
      setSuccess("Guide created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f8f6",
        p: { xs: 2, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 700, mx: "auto" }}>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#173F35",
              mb: 1,
            }}
          >
            Create Guide
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#6B7280" }}
          >
            Create a new guide account and give them access to manage
            activities.
          </Typography>
        </Box>

        {/* Form */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            bgcolor: "#fff",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>

              {/* Error */}
              {error && (
                <Alert severity="error">
                  {error?.error?.message || "Something went wrong"}
                </Alert>
              )}

              {/* Success */}
              {success && (
                <Alert severity="success">
                  {success}
                </Alert>
              )}

              {/* Name */}
              <TextField
                fullWidth
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ahmed Benali"
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}

                placeholder="guide@example.com"
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Role */}
              <TextField
                fullWidth
                label="Role"
                value="Guide"
                disabled
              />

              {/* Submit */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                disabled={loading}
                sx={{
                  bgcolor: "#173F35",
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#0E2F27",
                  },
                }}
              >
                {loading ? "Creating..." : "Create Guide"}
              </Button>

            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}