// import { Box, Typography, TextField, Button, Stack } from "@mui/material";
// import { useContext } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router";
// import { UserAuthContext } from "../../ContextAPI/AuthContext";
// import { toast } from "react-toastify";
// import GoogleIcon from "@mui/icons-material/Google";
// import useAxios from "../../Hooks/useAxios";

// const Register = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { registerUser, updateUser, setUser, googleLogin } =
//     useContext(UserAuthContext);
//   const axiosInstance = useAxios();

//   const handleRegister = (e) => {
//     e.preventDefault();
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//     const email = e.target.email.value;
//     const name = e.target.name.value;
//     const password = e.target.password.value;
//     const photo = e.target.photo.value;

//     if (!passwordRegex.test(password)) {
//       toast.error(
//         "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
//       );
//       return;
//     }

//     registerUser(email, password)
//       .then((res) => {
//         const currentUser = res.user;
//         updateUser(name, photo)
//           .then(() => {

//             if (currentUser) {
//               setUser({ ...currentUser, displayName: name, photoURL: photo });
//               toast.success("User Register Successfully");
//               axiosInstance
//                 .post("/users", { displayName: name, email, photoURL: photo })
//                 .then((res) => {

//                   if (res.data.insertedId) {
//                     navigate(location?.state || "/");
//                     e.target.reset();

//                   }
//                 })
//                 .catch((error) => {

//                   toast.error(error.message);
//                 });
//             }
//           })
//           .catch((error) => {

//             toast.error(error.message);
//           });
//       })
//       .catch((error) => {

//         toast.error(error.message);
//       });
//   };

//   const handleGoogleLogin = () => {
//     googleLogin()
//       .then((res) => {
//         if (res.user) {

//           setUser(res.user);

//           axiosInstance
//             .post("/users", {
//               displayName: res.user.displayName,
//               email: res.user.email,
//               photoURL: res.user.photoURL,
//             })
//             .then((res) => {

//               toast.success("Google login successfully !");
//               navigate(location?.state || "/");

//             })
//             .catch((error) => {
//               toast.error(error.message);
//             });
//         }
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   return (
//     <div>
//       <Box
//         display="flex"
//         minHeight="80vh"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Box
//           maxWidth="500px"
//           width="100%"
//           p={6}
//           boxShadow={3}
//           borderRadius={2}
//           bgcolor="white"
//         >
//           <Typography
//             variant="h5"
//             mb={2}
//             fontWeight="bold"
//             className="text-gray-700"
//           >
//             Register
//           </Typography>
//           <Typography className="text-gray-500" mb={3}>
//             Create your account to start using the app!
//           </Typography>

//           <Stack spacing={3} component="form" onSubmit={handleRegister}>
//             <TextField
//               label="Name"
//               variant="outlined"
//               fullWidth
//               name="name"
//               required
//             />
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               name="email"
//               type="email"
//               required
//             />
//             <TextField
//               label="Photo URL"
//               variant="outlined"
//               fullWidth
//               name="photo"
//               required
//             />
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               name="password"
//               required
//             />

//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               REGISTER
//             </Button>
//             <Typography className="text-gray-400" textAlign="center">
//               OR
//             </Typography>
//             <button
//               onClick={handleGoogleLogin}
//               type="button"
//               className="google-btn flex justify-center items-center gap-2"
//             >
//               <GoogleIcon />
//               <span className="button-content text-lg">Google </span>
//             </button>
//           </Stack>
//           <Typography mt={3} className="text-gray-600">
//             User already has an account. Please{" "}
//             <NavLink to="/login" className="underline font-bold">
//               Login
//             </NavLink>
//           </Typography>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Register;

import React, { useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
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
        "Password must be 6+ characters with uppercase, lowercase, number & special character"
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
              toast.success("Welcome to Book Courier!");
              axiosInstance
                .post("/users", { displayName: name, email, photoURL: photo })
                .then((res) => {
                  if (res.data.insertedId) {
                    navigate(location?.state || "/");
                    e.target.reset();
                  }
                })
                .catch((error) => toast.error(error.message));
            }
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
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
            .then(() => {
              toast.success("Joined with Google successfully!");
              navigate(location?.state || "/");
            })
            .catch((error) => toast.error(error.message));
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center px-4 py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop')`,
      }}
    >
      <Box
        className="w-full max-w-2xl p-8 md:p-14 rounded-[60px] shadow-2xl backdrop-blur-3xl bg-white/5 border border-white/10 transition-all duration-500"
        sx={{ boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.9)" }}
      >
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            className="font-black text-white mb-3 tracking-tighter italic text-4xl md:text-5xl py-3"
          >
            Join{" "}
            <span className="text-primary underline decoration-wavy underline-offset-8 ">
              Courier
            </span>
          </Typography>
          <Typography className="text-gray-300 font-medium text-lg">
            Create an account to unlock your personal library.
          </Typography>
        </div>

        <Stack spacing={5} component="form" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <TextField
              name="name"
              placeholder="Full Name"
              variant="standard"
              fullWidth
              required
              InputProps={{ className: "text-white text-lg py-2" }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.2)",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "rgba(255,255,255,0.5) !important",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "#3b82f6" },
              }}
            />
            <TextField
              name="email"
              placeholder="Email Address"
              variant="standard"
              fullWidth
              type="email"
              required
              InputProps={{ className: "text-white text-lg py-2" }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.2)",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "#3b82f6" },
              }}
            />
            <TextField
              name="photo"
              placeholder="Photo URL"
              variant="standard"
              fullWidth
              required
              InputProps={{ className: "text-white text-lg py-2" }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.2)",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "#3b82f6" },
              }}
            />
            <TextField
              name="password"
              placeholder="Strong Password"
              type="password"
              variant="standard"
              fullWidth
              required
              InputProps={{ className: "text-white text-lg py-2" }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.2)",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "#3b82f6" },
              }}
            />
          </div>

          <div className="flex flex-col gap-5 pt-6">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="w-full bg-primary py-4 rounded-[25px] font-black shadow-2xl shadow-blue-600/40 transform active:scale-95 transition-all text-white tracking-widest text-lg"
            >
              CREATE ACCOUNT
            </Button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center items-center gap-4 py-4 px-6 bg-white/10 hover:bg-white/15 border border-white/20 rounded-[25px] transition-all duration-300 shadow-lg active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="bg-white p-2 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <GoogleIcon sx={{ fontSize: 22, color: "#EA4335" }} />
              </div>

              <span className="font-bold text-white tracking-wide text-sm md:text-base">
                SIGN UP WITH GOOGLE
              </span>
            </button>
          </div>

          <Divider className="before:bg-white/10 after:bg-white/10">
            <Typography className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-bold">
              Already a Member?
            </Typography>
          </Divider>

          <div className="text-center">
            <NavLink
              to="/login"
              className="group text-white/60 text-sm font-medium transition-all"
            >
              Got an account?
              <span className="text-blue-400 font-black ml-2 group-hover:text-blue-300 underline underline-offset-4 decoration-2">
                Log In Here
              </span>
            </NavLink>
          </div>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
