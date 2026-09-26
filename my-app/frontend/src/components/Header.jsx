import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/authSlice";

export default function RihlaHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            minHeight: "60px",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#135d46",
              letterSpacing: "-0.5px",
            }}
            onClick={() => navigate("/")}
          >
            Rihla
          </Typography>

          {/* Navigation */}
          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
          >
            <Button
              disableRipple
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#1d2a23",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "#135d46",
                },
              }}
            >
              Activities
            </Button>

            <Button
              disableRipple
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: "#6c757d",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "#1d2a23",
                },
              }}
              onClick={() => navigate("")}
            >
              Reservations
            </Button>

            <Button
              disableRipple
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: "#6c757d",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "#1d2a23",
                },
              }}
            >
              Profile
            </Button>

            {/* Logout */}
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#135d46",
                borderColor: "#135d46",
                borderRadius: 2,

                "&:hover": {
                  bgcolor: "#135d46",
                  color: "#ffffff",
                  borderColor: "#135d46",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}