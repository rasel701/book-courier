import axios from "axios";
import React, { useContext, useEffect } from "react";

import { UserAuthContext } from "../ContextAPI/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useContext(UserAuthContext);
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken} `;
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log(error.status);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logoutUser()
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
