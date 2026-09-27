import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import {
  createGuideActivity,
  updateGuideActivity,
} from "../redux/slices/guideActivitySlice";
import { getActivityById } from "../redux/slices/detailsSlice";
import api from "../services/axios";
import { useParams } from "react-router-dom";

export default function CreateActivity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { loading } = useSelector((state) => state.activitys);

  const [categorys, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    location: "",
    category: "",
    date: "",
    duration: "",
    price: "",
    maxParticipants: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    city: "",
    location: "",
    category: "",
    date: "",
    duration: "",
    price: "",
    maxParticipants: "",
  });

  // Get categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");

        console.log("Categories:", response.data);

        setCategories(response.data.categorys || []);
      } catch (error) {
        console.log("Categories error:", error);
      }
    };

    getCategories();
  }, []);
  // get activity id
  useEffect(() => {
    if (!isEditMode) return;

    const getActivity = async () => {
      try {
        const result = await dispatch(getActivityById(id)).unwrap();

        console.log("EDIT RESULT:", result);

        const activity = result.activity || result;

        if (!activity) {
          console.log("Activity not found");
          return;
        }

        setFormData({
          title: activity.title || "",
          description: activity.description || "",
          city: activity.city || "",
          location: activity.location || "",
          category: activity.category?._id || activity.category || "",
          date: activity.date
            ? new Date(activity.date).toISOString().slice(0, 16)
            : "",
          duration: activity.duration || "",
          price: activity.price || "",
          maxParticipants: activity.maxParticipants || "",
        });
      } catch (error) {
        console.log("Failed to get activity:", error);
      }
    };

    getActivity();
  }, [id, isEditMode, dispatch]);

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
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({
      title: "",
      description: "",
      city: "",
      location: "",
      category: "",
      date: "",
      duration: "",
      price: "",
      maxParticipants: "",
    });

    try {
      let result;

      if (isEditMode) {
        result = await dispatch(
          updateGuideActivity({
            id,
            activityData: formData,
          }),
        ).unwrap();

        console.log("Activity updated:", result);
      } else {
        result = await dispatch(createGuideActivity(formData)).unwrap();

        console.log("Activity created:", result);
      }

      navigate("/guide/activities");
    } catch (error) {
      console.log("Backend error:", error);

      if (error?.errors) {
        const errors = {};

        error.errors.forEach((err) => {
          errors[err.path] = err.msg;
        });

        setFormErrors(errors);
      }
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FAFAF9",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Back */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/guide/activities")}
          sx={{
            mb: 3,
            color: "#135D46",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "transparent",
              color: "#0E4937",
            },
          }}
        >
          Back to My Activities
        </Button>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4">
            {isEditMode ? "Edit Activity" : "Create Activity"}
          </Typography>

          <Typography>
            {isEditMode
              ? "Update your activity information"
              : "Create a new experience for travelers"}
          </Typography>
        </Box>

        {/* Form */}
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            border: "1px solid #E8E8E8",
            borderRadius: 3,
            p: {
              xs: 3,
              md: 5,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1D2A23",
              mb: 1,
            }}
          >
            Activity Information
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#6C757D",
              mb: 3,
            }}
          >
            Fill in the information about your activity.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Stack spacing={3}>
            {/* Title */}
            <TextField
              fullWidth
              name="title"
              label="Activity title"
              placeholder="e.g. Randonnée en montagne"
              value={formData.title}
              onChange={handleChange}
              error={!!formErrors.title}
              helperText={formErrors.title}
              required
            />

            {/* Description */}
            <TextField
              fullWidth
              name="description"
              label="Description"
              placeholder="Describe your activity..."
              value={formData.description}
              onChange={handleChange}
              error={!!formErrors.description}
              helperText={formErrors.description}
              multiline
              rows={5}
              required
            />

            {/* City */}
            <TextField
              fullWidth
              name="city"
              label="City"
              placeholder="e.g. Beni Mellal"
              value={formData.city}
              onChange={handleChange}
              error={!!formErrors.city}
              helperText={formErrors.city}
              required
            />

            {/* Location */}
            <TextField
              fullWidth
              name="location"
              label="Location"
              placeholder="e.g. Montagnes de Beni Mellal"
              value={formData.location}
              onChange={handleChange}
              error={!!formErrors.location}
              helperText={formErrors.location}
              required
            />

            {/* Category */}
            <TextField
              select
              fullWidth
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              error={!!formErrors.category}
              helperText={formErrors.category}
              required
            >
              <MenuItem value="" disabled>
                Select category
              </MenuItem>

              {categorys.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Date */}
            <TextField
              fullWidth
              name="date"
              label="Activity date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChange}
              error={!!formErrors.date}
              helperText={formErrors.date}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            {/* Duration */}
            <TextField
              fullWidth
              name="duration"
              label="Duration"
              type="number"
              placeholder="e.g. 5"
              value={formData.duration}
              onChange={handleChange}
              error={!!formErrors.duration}
              helperText={formErrors.duration}
              inputProps={{
                min: 1,
              }}
              required
            />

            {/* Price */}
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              placeholder="e.g. 250"
              value={formData.price}
              onChange={handleChange}
              error={!!formErrors.price}
              helperText={formErrors.price}
              inputProps={{
                min: 0,
              }}
              InputProps={{
                endAdornment: (
                  <Typography
                    sx={{
                      color: "#6C757D",
                      ml: 1,
                    }}
                  >
                    DH
                  </Typography>
                ),
              }}
              required
            />

            {/* Max Participants */}
            <TextField
              fullWidth
              name="maxParticipants"
              label="Maximum participants"
              type="number"
              placeholder="e.g. 10"
              value={formData.maxParticipants}
              onChange={handleChange}
              error={!!formErrors.maxParticipants}
              helperText={formErrors.maxParticipants}
              inputProps={{
                min: 1,
              }}
              required
            />
          </Stack>

          <Divider sx={{ my: 4 }} />

          {/* Buttons */}
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={2}
            justifyContent="flex-end"
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/guide/activities")}
              disabled={loading}
              sx={{
                textTransform: "none",
                borderColor: "#D5D5D5",
                color: "#6C757D",
                borderRadius: 2,
                px: 3,
                "&:hover": {
                  borderColor: "#BDBDBD",
                  bgcolor: "#FAFAFA",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  <AddIcon />
                )
              }
              sx={{
                textTransform: "none",
                bgcolor: "#135D46",
                borderRadius: 2,
                px: 3,
                py: 1.2,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#0E4937",
                },
              }}
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Activity"
                  : "Create Activity"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
