import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { getActivityById } from "../redux/slices/detailsSlice";
import { createReservation } from "../redux/slices/reservationSlice";

import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";

export default function DetailsActivitys() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // =========================
  // Activity state
  // =========================

  const {
    activitys,
    loading,
    error,
  } = useSelector((state) => state.activity);

  // =========================
  // Auth state
  // =========================

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // =========================
  // Number of places
  // =========================

  const [numberOfPlaces, setNumberOfPlaces] = useState(1);

  // =========================
  // Success message
  // =========================

  const [success, setSuccess] = useState(false);

  // =========================
  // Get activity
  // =========================

  useEffect(() => {
    dispatch(getActivityById(id));
  }, [dispatch, id]);

  // =========================
  // Hide success message
  // =========================

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  // =========================
  // Debug
  // =========================

  console.log("activity:", activitys);
  console.log("isAuthenticated:", isAuthenticated);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Container>
    );
  }

  // =========================
  // Activity not found
  // =========================

  if (!activitys) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>
          Activity not found
        </Typography>
      </Container>
    );
  }

  // =========================
  // Reservation
  // =========================

  const handleReservation = async () => {
    // User not authenticated
    if (!isAuthenticated) {
      navigate(
        `/auth?redirect=/activities/${id}`
      );

      return;
    }

    // Invalid number
    if (
      numberOfPlaces < 1 ||
      numberOfPlaces > activitys.availablePlaces
    ) {
      return;
    }

    try {
      const result = await dispatch(
        createReservation({
          activityId: id,
          numberOfPlaces: numberOfPlaces,
        })
      ).unwrap();

      console.log(
        "Reservation created:",
        result
      );

      // Show success message
      setSuccess(true);

      // Reset number of places
      setNumberOfPlaces(1);

      // Update available places locally
      // if backend returned the updated activity
      // this can be replaced later by refetching
      dispatch(getActivityById(id));

    } catch (error) {
      console.log(
        "Reservation error:",
        error
      );
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      {/* ================= TITLE ================= */}

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        {activitys.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
        }}
      >
        {activitys.category?.name} •{" "}
        {activitys.duration}h
      </Typography>

      {/* ================= DATE ================= */}

      <Typography sx={{ mb: 1 }}>
        Date :{" "}
        {new Date(
          activitys.date
        ).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </Typography>

      {/* ================= TIME ================= */}

      <Typography sx={{ mb: 3 }}>
        Heure :{" "}
        {new Date(
          activitys.date
        ).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>

      {/* ================= CONTENT ================= */}

      <Grid
        container
        spacing={4}
      >
        {/* ================= IMAGE ================= */}

        <Grid item xs={12} md={8}>
          <Box
            component="img"
            src={activitys.category?.image}
            alt={
              activitys.category?.name ||
              "Activity"
            }
            sx={{
              width: "100%",
              maxWidth: 600,
              height: 350,
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        </Grid>

        {/* ================= RESERVATION CARD ================= */}

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "none",
              backgroundColor: "#fff",
            }}
          >
            {/* ================= SUCCESS ================= */}

            {success && (
              <Alert
                icon={
                  <CheckIcon fontSize="inherit" />
                }
                severity="success"
                sx={{
                  mx: 2,
                  mt: 2,
                }}
              >
                Reservation created
                successfully!
              </Alert>
            )}

            <CardContent
              sx={{
                p: 2,
              }}
            >
              {/* ================= ACTIVITY TITLE ================= */}

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                {activitys.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                }}
              >
                A guided experience with a
                local guide.
              </Typography>

              {/* ================= GUIDE ================= */}

              <Typography
                variant="body2"
                fontWeight="bold"
              >
                Guide
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                }}
              >
                {activitys.guide?.name} •
                Approved guide
              </Typography>

              {/* ================= PRICE ================= */}

              <Typography
                variant="body2"
                fontWeight="bold"
              >
                Price
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                }}
              >
                {activitys.price} DH / person
              </Typography>

              {/* ================= AVAILABLE PLACES ================= */}

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                }}
              >
                {activitys.availablePlaces}{" "}
                places available
              </Typography>

              {/* ================= SEATS ================= */}

              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  mb: 1,
                }}
              >
                Choose the number of seats
              </Typography>

              <TextField
                type="number"
                fullWidth
                size="small"
                value={numberOfPlaces}
                onChange={(e) => {
                  const value = Number(
                    e.target.value
                  );

                  setNumberOfPlaces(value);
                }}
                inputProps={{
                  min: 1,
                  max: activitys.availablePlaces,
                }}
                sx={{
                  mb: 2,
                }}
              />

              {/* ================= BUTTON ================= */}

              <Button
                fullWidth
                variant="contained"
                onClick={handleReservation}
                disabled={
                  activitys.availablePlaces <=
                  0
                }
                sx={{
                  backgroundColor:
                    "#096B55",

                  "&:hover": {
                    backgroundColor:
                      "#075442",
                  },

                  textTransform: "none",

                  fontWeight: "bold",
                }}
              >
                {activitys.availablePlaces <=
                0
                  ? "No places available"
                  : "Reserve activity"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}