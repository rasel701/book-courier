import React, { useContext } from "react";
import { Box, Typography, TextField, Button, Link, Stack } from "@mui/material";

import { NavLink, useLocation, useNavigate } from "react-router";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { loginUser, googleLogin } = useContext(UserAuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ email, password });
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user) {
          toast.success("User login successfully");
          e.target.reset();
          navigate(location?.state || "/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        if (res.user) {
          axiosInstance
            .post("/users", {
              displayName: res.user.displayName,
              email: res.user.email,
              photoURL: res.user.photoURL,
            })
            .then((res) => {
              console.log(res);

              toast.success("Google login successfully !");
              navigate(location?.state || "/");
              console.log(res.data);
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Box display="flex" minHeight="80vh">
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box
          maxWidth="400px"
          width="100%"
          p={6}
          boxShadow={3}
          borderRadius={2}
          bgcolor="white"
        >
          <Typography
            variant="h5"
            mb={2}
            fontWeight="bold"
            className="text-gray-600"
          >
            Login
          </Typography>
          <Typography className="text-gray-600" mb={3}>
            Login to view your board!
          </Typography>
          <Stack spacing={3} component="form" onSubmit={handleLogin}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            <Link href="#" sx={{ alignSelf: "flex-end", fontSize: "0.85rem" }}>
              Forgotten your password?
            </Link>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              LOGIN
            </Button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="google-btn flex justify-center items-center gap-2"
            >
              <GoogleIcon />
              <span className="button-content text-lg">Google </span>
            </button>
            <Typography textAlign="center" className="text-gray-600">
              OR
            </Typography>
            <NavLink to="/register" state={location?.state}>
              <Button variant="outlined" fullWidth>
                REGISTER
              </Button>
            </NavLink>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
