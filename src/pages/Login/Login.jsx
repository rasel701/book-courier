import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router";
import { UserAuthContext } from "../../ContextAPI/AuthContext";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { loginUser, googleLogin } = useContext(UserAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        if (res.user) {
          toast.success("Welcome back to Book Courier!");
          navigate(location?.state || "/");
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const setDemoCredentials = (role) => {
    const credentials = {
      admin: { e: "habib@ha.com", p: "Habib12@" },
      librarian: { e: "samim@sa.com", p: "Samim12@" },
      user: { e: "abir@ab.com", p: "Abir12@" },
    };

    const demoEmail = credentials[role].e;
    const demoPassword = credentials[role].p;

    setEmail(demoEmail);
    setPassword(demoPassword);

    loginUser(demoEmail, demoPassword)
      .then((res) => {
        if (res.user) {
          toast.success("Welcome back as " + role.toUpperCase());
          navigate(location?.state || "/");
        }
      })
      .catch((error) => toast.error(error.message));
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
            .then(() => {
              toast.success("Google login successful!");
              navigate(location?.state || "/");
            });
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1953&auto=format&fit=crop')`,
      }}
    >
      <Box
        className="w-full max-w-lg p-8 md:p-12 rounded-[50px] shadow-2xl backdrop-blur-2xl bg-white/5 border border-white/10 transition-all duration-500 transform hover:scale-[1.01]"
        sx={{ boxShadow: "0 40px 100px -20px rgba(0, 0, 0, 0.9)" }}
      >
        <div className="mb-10 text-center md:text-left">
          <Typography
            variant="h3"
            className="font-black text-white mb-2 tracking-tighter italic text-4xl md:text-5xl py-3"
          >
            Book{" "}
            <span className="text-primary underline decoration-wavy underline-offset-8">
              Courier
            </span>
          </Typography>
          <Typography className="text-gray-300 font-medium text-lg mt-3">
            Your gateway to the world of knowledge.
          </Typography>
        </div>

        <Stack spacing={4} component="form" onSubmit={handleLogin}>
          <div className="space-y-8">
            <TextField
              placeholder="Email Address"
              variant="standard"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Secret Password"
              type="password"
              variant="standard"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="bg-black/30 p-5 rounded-[30px] border border-white/10 shadow-inner">
            <Typography className="text-[10px] text-white/60 mb-4 tracking-[0.3em] text-center uppercase font-black">
              QUICK ACCESS
            </Typography>
            <div className="flex justify-around items-center">
              <Tooltip title="Login as Admin">
                <IconButton
                  onClick={() => setDemoCredentials("admin")}
                  className="bg-red-500/60 hover:bg-red-500/40 text-red-400 p-4 transition-all duration-300 shadow-lg"
                >
                  <AdminPanelSettingsIcon
                    fontSize="medium"
                    className="text-gray-300"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Login as Librarian">
                <IconButton
                  onClick={() => setDemoCredentials("librarian")}
                  className="bg-green-500/20 hover:bg-green-500/40 text-green-400 p-4 transition-all duration-300 shadow-lg"
                >
                  <LibraryBooksIcon
                    fontSize="medium"
                    className="text-gray-300"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Login as User">
                <IconButton
                  onClick={() => setDemoCredentials("user")}
                  className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 p-4 transition-all duration-300 shadow-lg"
                >
                  <PersonIcon className="text-gray-300" fontSize="medium" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-2">
            <Button
              type="submit"
              variant="contained"
              className="w-full bg-primary py-4 rounded-[25px] font-black shadow-2xl shadow-blue-600/40 transform active:scale-95 transition-all text-lg tracking-widest"
            >
              ACCESS ACCOUNT
            </Button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center items-center gap-4 py-4 px-6 bg-white/10 hover:bg-white/15 border border-white/20 rounded-[25px] transition-all duration-300 shadow-lg active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="bg-white p-2 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-[360deg] transition-transform duration-700">
                <GoogleIcon sx={{ fontSize: 20, color: "#EA4335" }} />
              </div>

              <span className="font-bold text-white tracking-wide text-sm md:text-base">
                CONTINUE WITH GOOGLE
              </span>
            </button>
          </div>

          <div className="text-center pt-2">
            <NavLink
              to="/register"
              className="group text-white/50 hover:text-white transition-all text-sm font-medium"
            >
              New to Book Courier?{" "}
              <span className="text-blue-400 font-black underline underline-offset-4 ml-1 group-hover:text-blue-300">
                Register Now
              </span>
            </NavLink>
          </div>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
