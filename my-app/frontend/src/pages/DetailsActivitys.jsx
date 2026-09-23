import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActivityById } from "../redux/slices/detailsSlice";

import { Box, Typography ,Container, } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function DetailsActivitys() {
  const { id } = useParams();
  const dispatch  = useDispatch();

  const { activity, loading, error } = useSelector((state) => state.activity);
  useEffect(() => {
    dispatch (getActivityById(id));
  }, [dispatch , id]);

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

  if (!activity) {
    return <p>Activity not found</p>;
  }
  return (
    <>
    <p> {activity.description}</p>
    </>
  )
}
