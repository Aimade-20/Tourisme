import { useEffect, useMemo, useState } from "react";

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  Pagination,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  Search,
  MoreVert,
  Visibility,
  Cancel,
  Event,
  People,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import { getAllReservations } from "../redux/slices/adminSlice";

const AdminReservations = () => {
  const dispatch = useDispatch();

  // ================= REDUX =================

  const {
    reservations = [],
    loading,
    error,
  } = useSelector((state) => state.admin);
  console.log("reservations" ,reservations);
  

  // ================= STATE =================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // ================= GET RESERVATIONS =================

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  // ================= FILTER =================

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const value = search.toLowerCase();

      const userName = reservation.user?.name?.toLowerCase() || "";

      const userEmail = reservation.user?.email?.toLowerCase() || "";

      const activityTitle = reservation.activity?.title?.toLowerCase() || "";

      const guideName =
        reservation.activity?.guide?.name?.toLowerCase() ||
        reservation.guide?.name?.toLowerCase() ||
        "";

      const matchesSearch =
        userName.includes(value) ||
        userEmail.includes(value) ||
        activityTitle.includes(value) ||
        guideName.includes(value);

      const matchesStatus = status === "all" || reservation.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, status]);

  // ================= PAGINATION =================

  const reservationsPerPage = 5;

  const totalPages = Math.ceil(
    filteredReservations.length / reservationsPerPage,
  );

  const startIndex = (page - 1) * reservationsPerPage;

  const displayedReservations = filteredReservations.slice(
    startIndex,
    startIndex + reservationsPerPage,
  );

  // ================= MENU =================

  const handleMenuOpen = (event, reservation) => {
    setAnchorEl(event.currentTarget);
    setSelectedReservation(reservation);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReservation(null);
  };

  // ================= STATUS =================

  const getStatusChip = (reservationStatus) => {
    switch (reservationStatus) {
      case "confirmed":
        return (
          <Chip
            label="Confirmed"
            size="small"
            sx={{
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
              fontWeight: 600,
            }}
          />
        );

      case "pending":
        return (
          <Chip
            label="Pending"
            size="small"
            sx={{
              backgroundColor: "#fff4e5",
              color: "#ed6c02",
              fontWeight: 600,
            }}
          />
        );

      case "cancelled":
        return (
          <Chip
            label="Cancelled"
            size="small"
            sx={{
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              fontWeight: 600,
            }}
          />
        );

      default:
        return <Chip label={reservationStatus || "Unknown"} size="small" />;
    }
  };

  // ================= DATE =================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= RENDER =================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f7f9f8",
        p: { xs: 2, md: 4 },
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ================= HEADER ================= */}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#173F35" }}>
          Reservations Management
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Manage and monitor all reservations
        </Typography>
      </Box>

      {/* ================= ERROR ================= */}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* ================= FILTERS ================= */}

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
          {/* SEARCH */}

          <TextField
            fullWidth
            placeholder="Search reservations..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* STATUS */}

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 200,
              },
            }}
          >
            <InputLabel>Status</InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              sx={{
                borderRadius: 2,
                backgroundColor: "white",
              }}
            >
              <MenuItem value="all">All Status</MenuItem>

              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* ================= TABLE ================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e0e5e2",
          overflow: "hidden",
        }}
      >
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 950 }}>
            {/* HEAD */}

            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f4f7f5",
                }}
              >
                <TableCell sx={{ fontWeight: 700 }}>User</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>Activity</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>Guide</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>Places</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>

                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}

            <TableBody>
              {/* LOADING */}

              {loading && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <CircularProgress
                      sx={{
                        color: "#173F35",
                      }}
                    />

                    <Typography
                      sx={{
                        mt: 2,
                        color: "text.secondary",
                      }}
                    >
                      Loading reservations...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {/* DATA */}

              {!loading &&
                displayedReservations.map((reservation) => {
                  const user = reservation.user || {};

                  const activity = reservation.activity || {};

                  const guide = activity.guide || reservation.guide || {};

                  return (
                    <TableRow
                      key={reservation._id}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      {/* USER */}

                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: "#e8f3ed",
                              color: "#173F35",
                            }}
                          >
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </Avatar>

                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {user.name || "Unknown user"}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {user.email || "No email"}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* ACTIVITY */}

                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{
                            maxWidth: 220,
                          }}
                        >
                          {activity.title || "Unknown activity"}
                        </Typography>
                      </TableCell>

                      {/* GUIDE */}

                      <TableCell>
                        <Typography variant="body2">
                          {guide.name || "Unknown guide"}
                        </Typography>
                      </TableCell>

                      {/* PLACES */}

                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <People
                            sx={{
                              fontSize: 18,
                              color: "text.secondary",
                            }}
                          />

                          <Typography variant="body2">
                            {reservation.numberOfPlaces ||
                              reservation.places ||
                              0}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* TOTAL */}

                      <TableCell>
                        <Typography
                          fontWeight={700}
                          sx={{
                            color: "#173F35",
                          }}
                        >
                          {reservation.totalPrice || reservation.total || 0} DH
                        </Typography>
                      </TableCell>

                      {/* DATE */}

                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Event
                            sx={{
                              fontSize: 18,
                              color: "text.secondary",
                            }}
                          />

                          <Box>
                            <Typography variant="body2">
                              {formatDate(activity.date || reservation.date)}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatTime(activity.date || reservation.date)}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* STATUS */}

                      <TableCell>{getStatusChip(reservation.status)}</TableCell>

                      {/* ACTIONS */}

                      <TableCell align="center">
                        <IconButton
                          onClick={(event) =>
                            handleMenuOpen(event, reservation)
                          }
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {/* EMPTY */}

              {!loading && filteredReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No reservations found
                    </Typography>

                    <Typography variant="body2" color="text.disabled">
                      Try changing your search or filter
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* ================= PAGINATION ================= */}

      {!loading && filteredReservations.length > 0 && totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 2,
              },

              "& .Mui-selected": {
                backgroundColor: "#173F35 !important",
                color: "white",
              },
            }}
          />
        </Box>
      )}

      {/* ================= ACTION MENU ================= */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility
            sx={{
              mr: 1,
              fontSize: 20,
            }}
          />
          View details
        </MenuItem>

        {selectedReservation?.status === "pending" && (
          <MenuItem onClick={handleMenuClose}>Confirm reservation</MenuItem>
        )}

        {selectedReservation?.status !== "cancelled" && (
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              color: "error.main",
            }}
          >
            <Cancel
              sx={{
                mr: 1,
                fontSize: 20,
              }}
            />
            Cancel reservation
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default AdminReservations;
