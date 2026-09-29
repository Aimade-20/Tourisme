import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/slices/categorySlice";

import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

import {
  Add,
  Search,
  MoreVert,
  Edit,
  Delete,
  Category as CategoryIcon,
} from "@mui/icons-material";

const ManageCategories = () => {
  const dispatch = useDispatch();

  // ================= REDUX =================

  const {
    categories = [],
    loading,
    error,
  } = useSelector((state) => state.category);

  // ================= LOCAL STATE =================

  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // ================= GET CATEGORIES =================

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // ================= SEARCH =================

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= ADD =================

  const handleAdd = () => {
    setEditMode(false);
    setSelectedCategory(null);

    setFormData({
      name: "",
      image: "",
    });

    setOpenDialog(true);
  };

  // ================= EDIT =================

  const handleEdit = (category) => {
    setEditMode(true);

    setSelectedCategory(category);

    setFormData({
      name: category.name || "",
      image: category.image || "",
    });

    setAnchorEl(null);

    setOpenDialog(true);
  };

  // ================= DELETE =================

  const handleDelete = async (category) => {
    setAnchorEl(null);

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(
        deleteCategory(category._id)
      ).unwrap();

      setSuccessMessage(
        "Category deleted successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CLOSE DIALOG =================

  const handleCloseDialog = () => {
    setOpenDialog(false);

    setFormData({
      name: "",
      image: "",
    });

    setSelectedCategory(null);
    setEditMode(false);
  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      return;
    }

    try {
      // ================= UPDATE =================

      if (editMode) {
        await dispatch(
          updateCategory({
            id: selectedCategory._id,
            data: {
              name: formData.name,
              image: formData.image,
            },
          })
        ).unwrap();

        setSuccessMessage(
          "Category updated successfully"
        );
      }

      // ================= CREATE =================

      else {
        await dispatch(
          createCategory({
            name: formData.name,
            image: formData.image,
          })
        ).unwrap();

        setSuccessMessage(
          "Category created successfully"
        );
      }

      handleCloseDialog();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= CLOSE SNACKBAR =================

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 4,
        },

        minHeight: "100vh",

        backgroundColor: "#f7f9f8",
      }}
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: {
            xs: "flex-start",
            md: "center",
          },

          flexDirection: {
            xs: "column",
            md: "row",
          },

          gap: 2,

          mb: 4,
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
            Manage Categories
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Create and manage activity categories
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#173F35",

            textTransform: "none",

            borderRadius: 2,

            px: 2.5,

            py: 1.2,

            fontWeight: 600,

            "&:hover": {
              backgroundColor: "#0E2F27",
            },
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
          }}
        >
          {error}
        </Alert>
      )}

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 2,

          mb: 3,

          borderRadius: 3,

          border: "1px solid #e5e9e7",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,

          border: "1px solid #e5e9e7",

          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>

            {/* ================= HEADER ================= */}

            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f1f5f3",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Category
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Image
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* ================= BODY ================= */}

            <TableBody>

              {/* LOADING */}

              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                  >
                    <Box
                      sx={{
                        py: 6,
                      }}
                    >
                      <CircularProgress
                        size={35}
                        sx={{
                          color: "#173F35",
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : filteredCategories.length === 0 ? (

                /* EMPTY */

                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                  >
                    <Box
                      sx={{
                        py: 6,
                      }}
                    >
                      <CategoryIcon
                        sx={{
                          fontSize: 50,

                          color: "#b8c5c0",

                          mb: 1,
                        }}
                      />

                      <Typography
                        color="text.secondary"
                      >
                        No categories found
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>

              ) : (

                /* CATEGORIES */

                filteredCategories.map(
                  (category) => (
                    <TableRow
                      key={category._id}
                      hover
                    >

                      {/* CATEGORY NAME */}

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",

                            gap: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              backgroundColor:
                                "#e4eee9",

                              color:
                                "#173F35",
                            }}
                          >
                            <CategoryIcon />
                          </Avatar>

                          <Typography
                            fontWeight={600}
                          >
                            {category.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* IMAGE */}

                      <TableCell>
                        {category.image ? (
                          <Box
                            component="img"
                            src={category.image}
                            alt={category.name}
                            sx={{
                              width: 90,

                              height: 55,

                              objectFit: "cover",

                              borderRadius: 2,
                            }}
                          />
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            No image
                          </Typography>
                        )}
                      </TableCell>

                      {/* ACTIONS */}

                      <TableCell align="right">

                        <IconButton
                          onClick={(e) => {
                            setAnchorEl(
                              e.currentTarget
                            );

                            setSelectedCategory(
                              category
                            );
                          }}
                        >
                          <MoreVert />
                        </IconButton>

                      </TableCell>

                    </TableRow>
                  )
                )
              )}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ================================================= */}
      {/* ACTION MENU */}
      {/* ================================================= */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() =>
          setAnchorEl(null)
        }
      >
        <MenuItem
          onClick={() =>
            handleEdit(selectedCategory)
          }
        >
          <Edit
            fontSize="small"
            sx={{
              mr: 1,
            }}
          />

          Edit
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleDelete(selectedCategory)
          }
          sx={{
            color: "error.main",
          }}
        >
          <Delete
            fontSize="small"
            sx={{
              mr: 1,
            }}
          />

          Delete
        </MenuItem>
      </Menu>

      {/* ================================================= */}
      {/* CREATE / EDIT DIALOG */}
      {/* ================================================= */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle
          sx={{
            fontWeight: 700,

            color: "#173F35",
          }}
        >
          {editMode
            ? "Edit Category"
            : "Add Category"}
        </DialogTitle>

        <DialogContent>

          {/* NAME */}

          <TextField
            fullWidth
            label="Category name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* IMAGE */}

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
            placeholder="https://..."
          />

          {/* IMAGE PREVIEW */}

          {formData.image && (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                }}
              >
                Image Preview
              </Typography>

              <Box
                component="img"
                src={formData.image}
                alt="preview"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
                sx={{
                  width: "100%",

                  height: 180,

                  objectFit: "cover",

                  borderRadius: 2,
                }}
              />
            </Box>
          )}

        </DialogContent>

        <DialogActions
          sx={{
            p: 2.5,
          }}
        >

          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#173F35",

              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              loading ||
              !formData.name.trim()
            }
            sx={{
              backgroundColor: "#173F35",

              textTransform: "none",

              borderRadius: 2,

              px: 3,

              "&:hover": {
                backgroundColor: "#0E2F27",
              },
            }}
          >
            {loading
              ? "Saving..."
              : editMode
              ? "Save Changes"
              : "Create Category"}
          </Button>

        </DialogActions>

      </Dialog>

      {/* ================================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ================================================= */}

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default ManageCategories;