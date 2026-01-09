import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { registerUser, updateUser, setUser, googleLogin } =
    useContext(UserAuthContext);
  const axiosInstance = useAxios();

  const handleRegister = (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

  
    registerUser(email, password)
      .then((res) => {
        const currentUser = res.user;
        updateUser(name, photo)
          .then(() => {
            
            if (currentUser) {
              setUser({ ...currentUser, displayName: name, photoURL: photo });
              toast.success("User Register Successfully");
              axiosInstance
                .post("/users", { displayName: name, email, photoURL: photo })
                .then((res) => {
              
                  if (res.data.insertedId) {
                    navigate(location?.state || "/");
                    e.target.reset();
                  
                  }
                })
                .catch((error) => {
                
                  toast.error(error.message);
                });
            }
          })
          .catch((error) => {
            
            toast.error(error.message);
          });
      })
      .catch((error) => {
    
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        if (res.user) {
  
          setUser(res.user);
          
          axiosInstance
            .post("/users", {
              displayName: res.user.displayName,
              email: res.user.email,
              photoURL: res.user.photoURL,
            })
            .then((res) => {
          

              toast.success("Google login successfully !");
              navigate(location?.state || "/");
              
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
    <div>
      <Box
        display="flex"
        minHeight="80vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          maxWidth="500px"
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
            className="text-gray-700"
          >
            Register
          </Typography>
          <Typography className="text-gray-500" mb={3}>
            Create your account to start using the app!
          </Typography>

          <Stack spacing={3} component="form" onSubmit={handleRegister}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              required
            />
            <TextField
              label="Photo URL"
              variant="outlined"
              fullWidth
              name="photo"
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              REGISTER
            </Button>
            <Typography className="text-gray-400" textAlign="center">
              OR
            </Typography>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="google-btn flex justify-center items-center gap-2"
            >
              <GoogleIcon />
              <span className="button-content text-lg">Google </span>
            </button>
          </Stack>
          <Typography mt={3} className="text-gray-600">
            User already has an account. Please{" "}
            <NavLink to="/login" className="underline font-bold">
              Login
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
