import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  Pagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  Search,
  MoreVert,
  CheckCircle,
  AccessTime,
  Person,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllGuide,
  updateGuide,
  deleteGuide,
} from "../redux/slices/adminSlice";

const GuidesManagement = () => {
  const dispatch = useDispatch();

  // =========================
  // Redux
  // =========================

  const {
    guides = [],
    loading,
    error,
  } = useSelector((state) => state.admin);

  // =========================
  // Search / Filter
  // =========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // =========================
  // Menu
  // =========================

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

  // =========================
  // Edit Dialog
  // =========================

  const [openEdit, setOpenEdit] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);

  const guidesPerPage = 6;

  // =========================
  // Get guides
  // =========================

  useEffect(() => {
    dispatch(getAllGuide());
  }, [dispatch]);

  // =========================
  // Menu Open
  // =========================

  const handleMenuOpen = (event, guide) => {
    setAnchorEl(event.currentTarget);
    setSelectedGuide(guide);
  };

  // =========================
  // Menu Close
  // =========================

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // =========================
  // Edit Open
  // =========================

  const handleEditOpen = (guide) => {
    setSelectedGuide(guide);

    setEditData({
      name: guide.name || "",
      email: guide.email || "",
    });

    setOpenEdit(true);

    // Important:
    // don't use handleMenuClose()
    // because it can clear selectedGuide
    setAnchorEl(null);
  };

  // =========================
  // Edit Close
  // =========================

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedGuide(null);

    setEditData({
      name: "",
      email: "",
    });
  };

  // =========================
  // Input Change
  // =========================

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Update Guide
  // =========================

  const handleUpdateGuide = async () => {
    if (!selectedGuide) return;

    try {
      await dispatch(
        updateGuide({
          id: selectedGuide._id,
          data: editData,
        })
      ).unwrap();

      handleEditClose();
    } catch (error) {
      console.log("Update guide error:", error);
    }
  };

  // =========================
  // Approve Guide
  // =========================

const handleApproveGuide = async (guide) => {
  if (!guide) return;

  try {
    await dispatch(
      updateGuide({
        id: guide._id,
        data: {
          isApproved: true,
        },
      })
    ).unwrap();

    setAnchorEl(null);
    setSelectedGuide(null);
  } catch (error) {
    console.log("Approve guide error:", error);
  }
};

  // =========================
  // Delete Guide
  // =========================

  const handleDeleteGuide = async () => {
    if (!selectedGuide) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedGuide.name}?`
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteGuide(selectedGuide._id)).unwrap();

      handleMenuClose();
      setSelectedGuide(null);
    } catch (error) {
      console.log("Delete guide error:", error);
    }
  };

  // =========================
  // Filter
  // =========================

  const filteredGuides = guides.filter((guide) => {
    const searchValue = search.toLowerCase();

    const name = guide.name?.toLowerCase() || "";
    const email = guide.email?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchValue) ||
      email.includes(searchValue);

    const matchesStatus =
      status === "all" ||
      (status === "approved" && guide.isApproved) ||
      (status === "pending" && !guide.isApproved);

    return matchesSearch && matchesStatus;
  });

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    filteredGuides.length / guidesPerPage
  );

  const startIndex = (page - 1) * guidesPerPage;

  const displayedGuides = filteredGuides.slice(
    startIndex,
    startIndex + guidesPerPage
  );

  // =========================
  // Search change
  // =========================

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  // =========================
  // Status change
  // =========================

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f9f8",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#173F35"
          >
            Guides Management
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage and monitor all guides
          </Typography>
        </Box>

        <Chip
          icon={<Person />}
          label={`${guides.length} Guides`}
          sx={{
            backgroundColor: "#e4f0eb",
            color: "#173F35",
            fontWeight: 600,
            px: 1,
          }}
        />
      </Box>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* =========================
          FILTERS
      ========================= */}

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e2e8e5",
          mb: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Search */}

            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Status */}

            <FormControl
              sx={{
                minWidth: { xs: "100%", md: 200 },
              }}
            >
              <InputLabel>Status</InputLabel>

              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="all">
                  All
                </MenuItem>

                <MenuItem value="approved">
                  Approved
                </MenuItem>

                <MenuItem value="pending">
                  Pending
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* =========================
          LOADING
      ========================= */}

      {loading && guides.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress
            sx={{
              color: "#173F35",
            }}
          />
        </Box>
      ) : displayedGuides.length === 0 ? (
        /* =========================
           NO GUIDES
        ========================= */

        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #e2e8e5",
            textAlign: "center",
            py: 8,
          }}
        >
          <Person
            sx={{
              fontSize: 60,
              color: "#b5c4bf",
              mb: 1,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={600}
            color="#173F35"
          >
            No guides found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Try changing your search or filter.
          </Typography>
        </Card>
      ) : (
        <>
          {/* =========================
              GUIDES GRID
          ========================= */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {displayedGuides.map((guide) => (
              <Card
                key={guide._id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e2e8e5",
                  transition: "0.2s",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow:
                      "0 8px 25px rgba(23,63,53,0.08)",
                  },
                }}
              >
                <CardContent>
                  {/* Top */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 55,
                          height: 55,
                          backgroundColor: "#173F35",
                          fontWeight: 700,
                        }}
                      >
                        {guide.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </Avatar>

                      <Box>
                        <Typography
                          fontWeight={700}
                          color="#173F35"
                        >
                          {guide.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {guide.email}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Menu */}

                    <IconButton
                      onClick={(event) =>
                        handleMenuOpen(event, guide)
                      }
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  {/* Status */}

                  <Box sx={{ mt: 3 }}>
                    {guide.isApproved ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Approved"
                        size="small"
                        sx={{
                          backgroundColor: "#e4f4e9",
                          color: "#2e7d32",
                          fontWeight: 600,
                        }}
                      />
                    ) : (
                      <Chip
                        icon={<AccessTime />}
                        label="Pending"
                        size="small"
                        sx={{
                          backgroundColor: "#fff4df",
                          color: "#ed8b00",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  {/* Email */}

                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Email
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {guide.email}
                    </Typography>
                  </Box>

                  {/* Role */}

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Role
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5 }}
                    >
                      {guide.role}
                    </Typography>
                  </Box>

                  {/* Approve button */}

                  {!guide.isApproved && (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CheckCircle />}
                      onClick={() => {
                        setSelectedGuide(guide);
                        handleApproveGuide();
                      }}
                      sx={{
                        mt: 3,
                        backgroundColor: "#2e7d32",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,

                        "&:hover": {
                          backgroundColor: "#256628",
                        },
                      }}
                    >
                      Approve Guide
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* =========================
              PAGINATION
          ========================= */}

          {totalPages > 1 && (
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
                onChange={(event, value) =>
                  setPage(value)
                }
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected":
                    {
                      backgroundColor: "#173F35",
                    },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* =========================
          ACTION MENU
      ========================= */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MuiMenuItem
          onClick={() =>
            handleEditOpen(selectedGuide)
          }
        >
          Update guide
        </MuiMenuItem>

        {selectedGuide &&
          !selectedGuide.isApproved && (
            <MuiMenuItem
              onClick={handleApproveGuide}
              sx={{
                color: "#2e7d32",
              }}
            >
              Approve guide
            </MuiMenuItem>
          )}

        <MuiMenuItem
          onClick={handleDeleteGuide}
          sx={{
            color: "error.main",
          }}
        >
          Delete guide
        </MuiMenuItem>
      </Menu>

      {/* =========================
          UPDATE DIALOG
      ========================= */}

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#173F35",
          }}
        >
          Update Guide
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            sx={{ mt: 1, mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={editData.email}
            onChange={handleEditChange}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleEditClose}
            sx={{
              color: "#173F35",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdateGuide}
            disabled={loading}
            sx={{
              backgroundColor: "#173F35",
              textTransform: "none",
              borderRadius: 2,

              "&:hover": {
                backgroundColor: "#0E2F27",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={22}
                sx={{ color: "white" }}
              />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuidesManagement;