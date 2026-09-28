import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import {
  getMyActivities,
  deleteGuideActivity,
} from "../redux/slices/guideActivitySlice";

export default function GuideActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activities, loading, error } = useSelector(
    (state) => state.guideActivity,
  );

  // ================= GET ACTIVITIES =================

  useEffect(() => {
    dispatch(getMyActivities());
  }, [dispatch]);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteGuideActivity(id)).unwrap();
    } catch (error) {
      console.log("Delete activity error:", error);
    }
  };

  // ================= LOADING =================

  if (loading && activities.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#135D46",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FAFAF9",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HEADER ================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1D2A23",
                mb: 1,
              }}
            >
              My Activities
            </Typography>

            <Typography
              sx={{
                color: "#6C757D",
              }}
            >
              Manage the activities you created
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/guide/activities/create")}
            sx={{
              bgcolor: "#135D46",
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
              py: 1.2,
              "&:hover": {
                bgcolor: "#0E4937",
              },
            }}
          >
            Create Activity
          </Button>
        </Box>

        {/* ================= ERROR ================= */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
            }}
          >
            {error}
          </Alert>
        )}

        {/* ================= REFRESH LOADING ================= */}

        {loading && activities.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <CircularProgress
              size={25}
              sx={{
                color: "#135D46",
              }}
            />
          </Box>
        )}

        {/* ================= EMPTY ================= */}

        {!loading && activities.length === 0 && !error && (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              bgcolor: "#ffffff",
              borderRadius: 3,
              border: "1px solid #E8E8E8",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "#1D2A23",
              }}
            >
              No activities yet
            </Typography>

            <Typography
              sx={{
                color: "#6C757D",
                mb: 3,
              }}
            >
              Create your first activity and start welcoming travelers.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/guide/activities/create")}
              sx={{
                bgcolor: "#135D46",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#0E4937",
                },
              }}
            >
              Create Activity
            </Button>
          </Box>
        )}

        {/* ================= ACTIVITIES ================= */}

        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid  sx={{ xs: 12, sm: 6, md: 4 }} key={activity._id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid #E8E8E8",
                  bgcolor: "#ffffff",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* IMAGE */}

                <CardMedia
                  component="img"
                  height="210"
                  image={activity.category.image}
                  alt={activity.title}
                />

                <CardContent sx={{ p: 3 }}>
                  {/* TITLE + CATEGORY */}

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1D2A23",
                        mb: 1,
                      }}
                    >
                      {activity.title}
                    </Typography>

                    {activity.category && (
                      <Chip
                        label={activity.category.name || activity.category}
                        size="small"
                        sx={{
                          bgcolor: "#E8F3EF",
                          color: "#135D46",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  {/* INFO */}

                  <Stack spacing={1.2} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LocationOnOutlinedIcon
                        sx={{
                          fontSize: 19,
                          color: "#6C757D",
                        }}
                      />

                      <Typography variant="body2" color="text.secondary">
                        {activity.city}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CalendarTodayOutlinedIcon
                        sx={{
                          fontSize: 18,
                          color: "#6C757D",
                        }}
                      />

                      <Typography variant="body2" color="text.secondary">
                        {activity.date
                          ? new Date(activity.date).toLocaleDateString()
                          : "No date"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <AccessTimeOutlinedIcon
                        sx={{
                          fontSize: 19,
                          color: "#6C757D",
                        }}
                      />

                      <Typography variant="body2" color="text.secondary">
                        {activity.duration} hours
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <PeopleIcon
                        sx={{
                          fontSize: 19,
                          color: "#6C757D",
                        }}
                      />

                      <Typography variant="body2" color="text.secondary">
                        {activity.availablePlaces} places available
                      </Typography>
                    </Box>
                  </Stack>

                  {/* PRICE */}

                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#135D46",
                      mb: 2.5,
                    }}
                  >
                    {activity.price} DH
                  </Typography>

                  {/* ACTIONS */}

                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        navigate(`/guide/activities/edit/${activity._id}`)
                      }
                      sx={{
                        textTransform: "none",
                        borderColor: "#135D46",
                        color: "#135D46",
                        "&:hover": {
                          borderColor: "#0E4937",
                          bgcolor: "#E8F3EF",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => handleDelete(activity._id)}
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
