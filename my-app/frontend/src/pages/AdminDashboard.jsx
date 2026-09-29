// import React from "react";
import { useEffect} from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";


import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CategoryIcon from "@mui/icons-material/Category";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers ,getAllReservations,getAllGuide} from "../redux/slices/adminSlice";
import { getActivitys } from "../redux/slices/activitysSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users , guides, reservations} = useSelector(
    (state) => state.admin
  );

    const { activities } = useSelector(
    (state) => state.activitys
  );

  console.log("dachbord activities" , activities);
  const countUser = users.length
  const counActivities = activities.length
  const counGuides = guides.length
  const counReservations= reservations.length
    useEffect(() => {
      dispatch(getAllUsers());
      dispatch(getActivitys());
      dispatch(getAllGuide());
      dispatch(getAllReservations());
    }, [dispatch]);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f9f8",
        py: 5,
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#173F35" }}
          >
            Admin Dashboard
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mt: 1 }}
          >
            Manage your Rihla platform
          </Typography>
        </Box>

        {/* Statistics */}
        <Grid container spacing={3} >


            <Grid item xs={12} sm={6} md={3} >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e5e2",
                  height: "100%",
                  transition: "0.2s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    // justifyContent: "center"
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                        backgroundColor: "#e8f3ed",
                        color: "#173F35",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 40 }} />
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 3,
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                   Users
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      color: "#173F35",
                      mt: 0.5,
                    }}
                  >
                    {countUser}
                  </Typography>

                  <Button
                    onClick={() => navigate("/admin/users")}
                    sx={{
                      mt: 2,
                      color: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      p: 0,

                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                   View Users →
                  </Button>

                </CardContent>
              </Card>
            </Grid>
            {/* =================================guide========================= */}

            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e5e2",
                  height: "100%",
                  transition: "0.2s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    // justifyContent: "center"
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                        backgroundColor: "#e8f3ed",
                        color: "#173F35",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GroupsIcon sx={{ fontSize: 40 }} />
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 3,
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                   guides
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      color: "#173F35",
                      mt: 0.5,
                    }}
                  >
                    {counGuides}
                  </Typography>

                  <Button
                    onClick={() => navigate("/admin/guides")}
                    sx={{
                      mt: 2,
                      color: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      p: 0,

                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                   View guides →
                  </Button>

                </CardContent>
              </Card>
            </Grid>
            {/* ========================Activities ============================= */}

                        <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e5e2",
                  height: "100%",
                  transition: "0.2s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    // justifyContent: "center"
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                        backgroundColor: "#e8f3ed",
                        color: "#173F35",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 40 }} />
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 3,
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                   Activities
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      color: "#173F35",
                      mt: 0.5,
                    }}
                  >
                    {counActivities}
                  </Typography>

                  <Button
                    onClick={() => navigate("/admin/activities")}
                    sx={{
                      mt: 2,
                      color: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      p: 0,

                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                   View Activities →
                  </Button>

                </CardContent>
              </Card>
            </Grid>
            {/* =========================== Reservations ======================================*/}
                        <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e5e2",
                  height: "100%",
                  transition: "0.2s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    // justifyContent: "center"
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 2,
                        backgroundColor: "#e8f3ed",
                        color: "#173F35",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EventNoteIcon sx={{ fontSize: 40 }} />
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 3,
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                   Reservations
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      color: "#173F35",
                      mt: 0.5,
                    }}
                  >
                    {counReservations}
                  </Typography>

                  <Button
                    onClick={() => navigate("/admin/reservations")}
                    sx={{
                      mt: 2,
                      color: "#2e7d32",
                      textTransform: "none",
                      fontWeight: 600,
                      p: 0,

                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                   View Reservations →
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          {/* Categories */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e0e5e2",
              }}
            >
              <CardContent sx={{ p: 3 }}>

                <Stack direction="row" spacing={2} alignItems="center">

                  <Box
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: 2,
                      backgroundColor: "#e8f3ed",
                      color: "#173F35",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CategoryIcon sx={{ fontSize: 40 }} />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#173F35" }}
                    >
                      Categories
                    </Typography>

                    <Typography color="text.secondary">
                      Create and manage activity categories
                    </Typography>
                  </Box>

                </Stack>

                <Button
                  variant="contained"
                  startIcon={<CategoryIcon />}
                  onClick={() => navigate("/admin/categories")}
                  sx={{
                    mt: 3,
                    backgroundColor: "#173F35",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,

                    "&:hover": {
                      backgroundColor: "#0E2F27",
                    },
                  }}
                >
                  Manage Categories
                </Button>

              </CardContent>
            </Card>
          </Grid>

          {/* Create Guide */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e0e5e2",
              }}
            >
              <CardContent sx={{ p: 3 }}>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#173F35" }}
                >
                  Guide Management
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Create a guide account and manage guide permissions.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => navigate("/admin/guides/create")}
                  sx={{
                    mt: 1.5,
                    backgroundColor: "#2e7d32",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,

                    "&:hover": {
                      backgroundColor: "#1b5e20",
                    },
                  }}
                >
                  + Create Guide
                </Button>

              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;