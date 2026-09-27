import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { logout } from "../redux/slices/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        color: "#1D2A23",
        borderBottom: "1px solid #E8E8E8",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#135D46",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Rihla
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* ================= GUEST ================= */}
        {!isAuthenticated && (
          <>
            <Button
              onClick={() => navigate("/activitys")}
              sx={{
                color: "#1D2A23",
                textTransform: "none",
              }}
            >
              Activities
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/auth")}
              sx={{
                ml: 2,
                bgcolor: "#135D46",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#0E4937",
                },
              }}
            >
              Login
            </Button>
          </>
        )}

        {/* ================= USER ================= */}
        {isAuthenticated && user?.role === "user" && (
          <>
            <Button
              onClick={() => navigate("/activitys")}
              sx={{
                color: "#1D2A23",
                textTransform: "none",
              }}
            >
              Activities
            </Button>

            <Button
              onClick={() =>
                navigate("/activitys/reservations/me")
              }
              sx={{
                color: "#1D2A23",
                textTransform: "none",
              }}
            >
              My Reservations
            </Button>

            <Button
              onClick={handleLogout}
              sx={{
                ml: 1,
                color: "#D32F2F",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </>
        )}

        {/* ================= GUIDE ================= */}
        {isAuthenticated && user?.role === "guide" && (
          <>
            <Button
              onClick={() => navigate("/activitys")}
              sx={{
                color: "#1D2A23",
                textTransform: "none",
              }}
            >
              Activities
            </Button>

            <Button
              onClick={() => navigate("/guide/activities")}
              sx={{
                color: "#135D46",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              My Activities
            </Button>

            <Button
              onClick={handleLogout}
              sx={{
                ml: 1,
                color: "#D32F2F",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}