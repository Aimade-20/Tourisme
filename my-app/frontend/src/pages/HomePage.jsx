import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  TextField,
  Stack,
  Chip,
  Divider,
  MenuItem,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getActivitys } from "../redux/slices/activitysSlice";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

export default function ActivitysAndFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setselectedPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [categorys, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");
        // console.log("response.data =", response.data);
        // console.log("categories from response =", response.data.categorys);
        setCategories(response.data.categorys || []);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  const { activities, loading, error } = useSelector(
    (state) => state.activitys,
  );

  useEffect(() => {
    dispatch(getActivitys());
  }, [dispatch]);
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
  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  const filteredActivities = activities.filter((activity) => {
    return (
      (!selectedCity || activity.city.toLowerCase().includes(selectedCity.toLowerCase())) &&
      (!selectedCategory || activity.category.name === selectedCategory) &&
      (!selectedPrice || activity.price <= Number(selectedPrice)) &&
      (!selectedDate || activity.date.startsWith(selectedDate))
    );
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f8f6",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#173F35",
              mb: 1,
            }}
          >
            Discover Activities
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#6B7280",
              fontSize: "17px",
            }}
          >
            Find your next experience across Morocco.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#173F35",
                }}
              >
                Activities
              </Typography>

              <Chip
                label={`${filteredActivities.length} activities`}
                sx={{
                  bgcolor: "#E3EFE9",
                  color: "#173F35",
                  fontWeight: 500,
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {filteredActivities.map((activity) => (
                <Grid
                  key={activity._id}
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      overflow: "hidden",
                      border: "1px solid #E5E7EB",
                      boxShadow: "none",

                      transition: "0.2s",

                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 180,
                        bgcolor: "#DDE8E2",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        color: "#527064",
                      }}
                    >
                      <Box
                        component="img"
                        src={activity.category.image}
                        alt={activity.category.name}
                        sx={{
                          width: "100%",
                          height: 182,
                          objectFit: "cover",
                          borderRadius: 3,
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        p: 2.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#173F35",
                          mb: 1,
                        }}
                      >
                        {activity.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          mb: 1.5,
                        }}
                      >
                        📍 {activity.city} · {activity.location}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          mb: 2,
                        }}
                      >
                        {activity.description}
                      </Typography>

                      <Divider
                        sx={{
                          mb: 2,
                        }}
                      />

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Chip size="small" label={`${activity.duration}h`} />

                        <Chip
                          size="small"
                          label={`${activity.availablePlaces} places`}
                        />

                        <Chip
                          size="small"
                          label={`${activity.price} DH`}
                          sx={{
                            bgcolor: "#E3EFE9",
                            color: "#173F35",
                            fontWeight: 600,
                          }}
                        />
                      </Stack>
                    </CardContent>

                    <CardActions
                      sx={{
                        px: 2.5,
                        pb: 2.5,
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        onClick={() => navigate(`/activities/${activity._id}`)}
                        sx={{
                          bgcolor: "#173F35",
                          borderRadius: 2,
                          textTransform: "none",
                          py: 1.2,

                          "&:hover": {
                            bgcolor: "#0E2F27",
                          },
                        }}
                      >
                        View details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",

                position: "sticky",
                top: 20,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#173F35",
                  mb: 1,
                }}
              >
                Filters
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  mb: 3,
                }}
              >
                Find the activity that suits you.
              </Typography>
              {/* filter  */}
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="City"
                  placeholder="e.g. Beni Mellal"
                  variant="outlined"
                  size="small"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                />

                <TextField
                  select
                  fullWidth
                  label="Category"
                  variant="outlined"
                  size="small"
                  value={selectedCategory}
                  defaultValue=""
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="">All categories</MenuItem>

                  {categorys.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  type="number"
                  label="Maximum price"
                  placeholder="300"
                  variant="outlined"
                  size="small"
                  value={selectedPrice}
                  onChange={(e) => setselectedPrice(e.target.value)}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
