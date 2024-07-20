import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BiLockOpenAlt } from "react-icons/bi";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/userSlice"
import { toast } from "react-toastify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}/;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userState);

  useEffect(() => {
    if (!loading && !error && user) {
      toast.success("Registered successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } else if (!loading && !user && error) {
      setErrors({ email: error });
    }
  }, [user, loading, error]);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateData = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Enter a valid email address";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Enter a valid Password";
    } else if (values.password !== values.cpassword) {
      errors.cpassword = "Confirm Password and Password must be the same";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validateData(userData);
    setErrors(result);
    if (Object.keys(errors).length === 0) {
      dispatch(registerUser({ userData }));
    }
  };



  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "green.main" }}>
          <BiLockOpenAlt />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          {errors.username && (
            <Box my={"8px"}>
              <Alert severity="error">{errors.username}</Alert>
            </Box>
          )}
          <TextField
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {errors.email && (
            <Box my={"8px"}>
              <Alert severity="error">{errors.email}</Alert>
            </Box>
          )}
          <TextField
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {errors.password && (
            <Box my={"8px"}>
              <Alert severity="error">{errors.password}</Alert>
            </Box>
          )}
          <TextField
            value={userData.cpassword}
            onChange={(e) =>
              setUserData({ ...userData, cpassword: e.target.value })
            }
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            autoComplete="confirm-password"
          />
          {errors.cpassword && (
            <Box my={"8px"}>
              <Alert severity="error">{errors.cpassword}</Alert>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2" style={{ color: "#8bc34a" }}>
                {"Already have an account? Log in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Register;
