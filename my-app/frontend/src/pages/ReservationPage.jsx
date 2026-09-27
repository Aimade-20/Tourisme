import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Divider,
} from "@mui/material";

import {
  CalendarMonth,
  LocationOn,
  People,
  AccessTime,
  Payments,
  Cancel,
} from "@mui/icons-material";

import {
  getMyreservation,
  cancelReservation,
} from "../redux/slices/reservationSlice";

const ReservationPage = () => {
  const dispatch = useDispatch();

  const { reservation, loading, error } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    dispatch(getMyreservation());
  }, [dispatch]);

  // Cancel reservation
  const handleCancel = (reservationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (confirmed) {
      dispatch(cancelReservation(reservationId));
    }
  };

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8faf9",
        py: 6,
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#1b5e20",
              mb: 1,
            }}
          >
            My Reservations
          </Typography>

          <Typography color="text.secondary">
            Manage and view all your reservations
          </Typography>
        </Box>

        {/* EMPTY STATE */}
        {reservation.length === 0 ? (
          <Card
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid #e0e0e0",
            }}
          >
            <CalendarMonth
              sx={{
                fontSize: 70,
                color: "#81c784",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={600}
              mb={1}
            >
              No reservations yet
            </Typography>

            <Typography
              color="text.secondary"
              mb={3}
            >
              You haven't made any reservations yet.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2e7d32",
                borderRadius: 2,
                px: 4,
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              Explore Activities
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>

            {reservation.map((item) => {
              const activity = item.activity;

              const isCancelled =
                item.status === "cancelled";

              return (
                <Grid
                  item
                  xs={9}
                  md={6}
                  key={item._id}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid #e0e0e0",
                      transition: "0.3s",

                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                      },

                      // Make cancelled card slightly faded
                      ...(isCancelled && {
                        opacity: 0.75,
                      }),
                    }}
                  >

                    {/* IMAGE */}
                    {activity?.image && (
                      <CardMedia
                        component="img"
                        height="210"
                        image={activity.image}
                        alt={activity.title}
                        sx={{
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <CardContent sx={{ p: 3 }}>

                      {/* TITLE + STATUS */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{
                            color: "#212121",
                          }}
                        >
                          {activity?.title || "Activity"}
                        </Typography>

                        <Chip
                          label={
                            item.status === "cancelled"
                              ? "Cancelled"
                              : "Confirmed"
                          }
                          size="small"
                          color={
                            isCancelled
                              ? "error"
                              : "success"
                          }
                          sx={{
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      {/* LOCATION */}
                      {activity?.city && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <LocationOn
                            fontSize="small"
                            sx={{
                              color: "#2e7d32",
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {activity.city}

                            {activity.location
                              ? ` • ${activity.location}`
                              : ""}
                          </Typography>
                        </Box>
                      )}

                      {/* DATE */}
                      {activity?.date && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <CalendarMonth
                            fontSize="small"
                            sx={{
                              color: "#2e7d32",
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {new Date(
                              activity.date
                            ).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Typography>
                        </Box>
                      )}

                      {/* DURATION */}
                      {activity?.duration && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <AccessTime
                            fontSize="small"
                            sx={{
                              color: "#2e7d32",
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {activity.duration} hours
                          </Typography>
                        </Box>
                      )}

                      {/* NUMBER OF PLACES */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <People
                          fontSize="small"
                          sx={{
                            color: "#2e7d32",
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.numberOfPlaces || 0}{" "}
                          place
                          {item.numberOfPlaces > 1
                            ? "s"
                            : ""}
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      {/* PRICE */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Payments
                            fontSize="small"
                            sx={{
                              color: "#2e7d32",
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Total price
                          </Typography>
                        </Box>

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{
                            color: "#2e7d32",
                          }}
                        >
                          {item.totalPrice ??
                            activity?.price ??
                            0}{" "}
                          DH
                        </Typography>
                      </Box>

                      {/* CANCEL BUTTON */}
                      {!isCancelled && (
                        <Button
                          variant="outlined"
                          color="error"
                          fullWidth
                          startIcon={<Cancel />}
                          onClick={() =>
                            handleCancel(item._id)
                          }
                          sx={{
                            mt: 3,
                            py: 1.2,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: "none",

                            "&:hover": {
                              backgroundColor:
                                "#ffebee",
                            },
                          }}
                        >
                          Cancel Reservation
                        </Button>
                      )}

                      {/* CANCELLED MESSAGE */}
                      {isCancelled && (
                        <Box
                          sx={{
                            mt: 3,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: "#ffebee",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="error"
                            fontWeight={600}
                          >
                            This reservation has
                            been cancelled
                          </Typography>
                        </Box>
                      )}

                    </CardContent>
                  </Card>
                </Grid>
              );
            })}

          </Grid>
        )}

      </Container>
    </Box>
  );
};

export default ReservationPage;