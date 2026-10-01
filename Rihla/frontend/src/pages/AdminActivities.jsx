import { useMemo, useState, useEffect } from "react";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

import {
  Search,
  LocationOn,
  AccessTime,
  People,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import api from "../services/axios";

import { getActivitys } from "../redux/slices/activitysSlice";

const AdminActivities = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [categorys, setCategories] = useState([]);

  // ================= GET CATEGORIES =================

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data.categorys || []);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  // ================= REDUX =================

  const { activities = [], loading } = useSelector(
    (state) => state.activitys
  );

  // ================= GET ACTIVITIES =================

  useEffect(() => {
    dispatch(getActivitys());
  }, [dispatch]);

  // ================= FILTER =================

  const filteredActivities = useMemo(() => {
    const list = activities || [];

    return list.filter((activity) => {
      const searchValue = search.toLowerCase();

      const title = activity.title?.toLowerCase() || "";

      const city = activity.city?.toLowerCase() || "";

      const guideName =
        activity.guide?.name?.toLowerCase() || "";

      const categoryName =
        activity.category?.name || "";

      const matchesSearch =
        title.includes(searchValue) ||
        city.includes(searchValue) ||
        guideName.includes(searchValue);

      const matchesCategory =
        category === "all" ||
        categoryName === category;

      return matchesSearch && matchesCategory;
    });
  }, [activities, search, category]);

  // ================= AVAILABILITY COLOR =================

  const getAvailabilityColor = (available, max) => {
    if (!max) return "default";

    const percentage = (available / max) * 100;

    if (percentage <= 20) {
      return "error";
    }

    if (percentage <= 50) {
      return "warning";
    }

    return "success";
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f7f9f8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="text.secondary">
          Loading activities...
        </Typography>
      </Box>
    );
  }

  // ================= UI =================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        backgroundColor: "#f7f9f8",
        p: {
          xs: 2,
          md: 4,
        },
        overflowX: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}

      <Box
        sx={{
          mb: 4,

          display: "flex",

          justifyContent: "space-between",

          alignItems: {
            xs: "flex-start",
            md: "center",
          },

          gap: 2,

          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#173F35",
            }}
          >
            Activities Management
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Manage all activities on the platform
          </Typography>
        </Box>
      </Box>

      {/* ================= SEARCH + FILTER ================= */}

      <Card
        elevation={0}
        sx={{
          p: 2,

          mb: 4,

          borderRadius: 3,

          border: "1px solid #e0e5e2",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          {/* ================= SEARCH ================= */}

          <TextField
            fullWidth
            placeholder="Search activities..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",

              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* ================= CATEGORY ================= */}

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 200,
              },
            }}
          >
            <InputLabel>
              Category
            </InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              sx={{
                borderRadius: 2,

                backgroundColor: "white",
              }}
            >
              <MenuItem value="all">
                All Categories
              </MenuItem>

              {categorys.map((category) => (
                <MenuItem
                  key={category._id}
                  value={category.name}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* ================= ACTIVITIES ================= */}

      {filteredActivities.length > 0 ? (
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",

              sm: "repeat(2, minmax(0, 1fr))",

              lg: "repeat(3, minmax(0, 1fr))",
            },

            gap: 3,

            width: "100%",
          }}
        >
          {filteredActivities.map((activity) => {
            const availablePlaces =
              activity.availablePlaces ?? 0;

            const maxParticipants =
              activity.maxParticipants ?? 0;

            return (
              <Card
                key={activity._id}
                elevation={0}
                sx={{
                  width: "100%",

                  minWidth: 0,

                  borderRadius: 3,

                  border:
                    "1px solid #e0e5e2",

                  overflow: "hidden",

                  backgroundColor: "white",

                  transition: "0.2s",

                  "&:hover": {
                    transform:
                      "translateY(-4px)",

                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* ================= IMAGE ================= */}

                <CardMedia
                  component="img"
                  height="190"
                  image={
                    activity.image ||
                    activity.category?.image ||
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                  }
                  alt={activity.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    p: 2.5,
                  }}
                >
                  {/* ================= CATEGORY ================= */}

                  <Box
                    sx={{
                      display: "flex",

                      justifyContent:
                        "space-between",

                      alignItems: "center",

                      mb: 1.5,
                    }}
                  >
                    <Chip
                      label={
                        activity.category?.name ||
                        "No category"
                      }
                      size="small"
                      sx={{
                        backgroundColor:
                          "#e8f3ed",

                        color: "#173F35",

                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  {/* ================= TITLE ================= */}

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: "#173F35",

                      mb: 1,

                      display: "-webkit-box",

                      WebkitLineClamp: 2,

                      WebkitBoxOrient:
                        "vertical",

                      overflow: "hidden",
                    }}
                  >
                    {activity.title}
                  </Typography>

                  {/* ================= LOCATION ================= */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 0.5,

                      mb: 1,
                    }}
                  >
                    <LocationOn
                      sx={{
                        fontSize: 18,

                        color: "#2e7d32",
                      }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {activity.city ||
                        "Unknown city"}
                    </Typography>
                  </Box>

                  {/* ================= DATE + DURATION ================= */}

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 2,
                    }}
                  >
                    {/* DURATION */}

                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "center",

                        gap: 0.5,
                      }}
                    >
                      <AccessTime
                        sx={{
                          fontSize: 17,

                          color:
                            "text.secondary",
                        }}
                      />

                      <Typography
                        variant="body2"
                      >
                        {activity.duration ??
                          0}
                        h
                      </Typography>
                    </Box>

                    {/* DATE */}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {activity.date
                        ? new Date(
                            activity.date
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",

                              month: "short",

                              year: "numeric",
                            }
                          )
                        : "No date"}
                    </Typography>
                  </Stack>

                  {/* ================= GUIDE ================= */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 1,

                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,

                        height: 30,

                        backgroundColor:
                          "#e8f3ed",

                        color: "#173F35",

                        fontSize: 14,
                      }}
                    >
                      {activity.guide?.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "G"}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Guide
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                      >
                        {activity.guide?.name ||
                          "Unknown guide"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* ================= PRICE + PLACES ================= */}

                  <Box
                    sx={{
                      pt: 2,

                      borderTop:
                        "1px solid #edf0ee",

                      display: "flex",

                      justifyContent:
                        "space-between",

                      alignItems: "center",
                    }}
                  >
                    {/* PRICE */}

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          color: "#173F35",
                        }}
                      >
                        {activity.price ??
                          0}{" "}
                        DH
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        per person
                      </Typography>
                    </Box>

                    {/* PLACES */}

                    <Chip
                      icon={<People />}
                      label={`${availablePlaces}/${maxParticipants}`}
                      color={getAvailabilityColor(
                        availablePlaces,
                        maxParticipants
                      )}
                      size="small"
                    />
                  </Box>

                  {/* ================= ACTIONS ================= */}

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      mt: 2,
                    }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        /* ================= EMPTY ================= */

        <Box
          sx={{
            textAlign: "center",

            py: 10,
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
          >
            No activities found
          </Typography>

          <Typography
            variant="body2"
            color="text.disabled"
            sx={{
              mt: 1,
            }}
          >
            Try changing your search or
            category filter.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AdminActivities;