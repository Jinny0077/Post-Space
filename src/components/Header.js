import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { action } from "../utils/auth";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    action();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "1%",
        marginRight: "7%",
      }}
    >
      <Box>
        <Button
          sx={{ color: "#F95A50", fontSize: "16px", textTransform: "none" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
