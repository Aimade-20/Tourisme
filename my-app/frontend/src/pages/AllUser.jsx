
import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/slices/adminSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.admin
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Search + Filter
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue);
      return matchesSearch
    });
  }, [users, search]);

  // Pagination
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f7f6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: "#173F35" }}
        >
          Users Management
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Manage registered users and guides
        </Typography>
      </Box>

      {/* Main Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* Search + Filter */}
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TextField
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearchChange}
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 320 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Loading */}
        {loading ? (
          <Box
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress sx={{ color: "#173F35" }} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4 }}>
            <Typography color="error">
              {error}
            </Typography>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No users found
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Try changing your search or filter.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f8faf9",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700 }}>
                      User
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Email
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Role
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      hover
                    >
                      {/* User */}
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: "#173F35",
                            }}
                          >
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </Avatar>

                          <Typography fontWeight={600}>
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <Typography
                          color="text.secondary"
                        >
                          {user.email}
                        </Typography>
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                            backgroundColor:
                              user.role === "guide"
                                ? "#e8f5e9"
                                : user.role === "admin"
                                ? "#ffebee"
                                : "#f1f3f4",
                            color:
                              user.role === "guide"
                                ? "#2e7d32"
                                : user.role === "admin"
                                ? "#c62828"
                                : "#555",
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AdminUsers;

