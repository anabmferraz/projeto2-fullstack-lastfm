import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { CircularProgress, Box } from "@mui/material";

const protectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default protectedRoute;
