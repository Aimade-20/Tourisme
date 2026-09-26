import {   useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActivityById } from "../redux/slices/detailsSlice";
// import { useNavigate } from "react-router-dom";
// import register from "../pages/registerPage"

import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function DetailsActivitys() {
  const { id } = useParams();
  //  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activitys, loading, error } = useSelector((state) => state.activity);
  
  useEffect(() => {
    dispatch(getActivityById(id));
  }, [dispatch, id]);
  console.log("activity", activitys);


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

  if (!activitys) {
    return <p>Activity not found</p>;
  }
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        {activitys.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {activitys.category.name} • {activitys.duration}h
        <Typography>
          Date :{" "}
          {new Date(activitys.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <Typography>
          Heure :{" "}
          {new Date(activitys.date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Typography>

      <Grid container spacing={20}>
        {/* Image */}
        <Grid item xs={12} md={8} >
          <Box
            component="img"
            src={activitys.category.image}
            alt={activitys.category.name}
            sx={{
              width: "400px",
              height: 300,
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        </Grid>

        {/* Reservation Card */}
        <Grid item xs={12} md={4} sx={{mt:2.5}}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "none",
              backgroundColor: "#fff",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Atlas Mountain Hiking
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                A guided experience with a local guide.
              </Typography>

              {/* Guide */}
              <Typography variant="body2" fontWeight="bold">
                Guide
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {activitys.guide.name} • Approved guide
              </Typography>

              {/* Number of seats */}
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Choose the number of seats
              </Typography>

              <TextField
                type="number"
                fullWidth
                size="small"
                defaultValue={1}
                inputProps={{
                  min: 1,
                }}
                sx={{ mb: 2 }}
              />

              {/* Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#096B55",
                  "&:hover": {
                    backgroundColor: "#075442",
                  },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                // onClick={handleReservation}
              >
                Reserve activity
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
