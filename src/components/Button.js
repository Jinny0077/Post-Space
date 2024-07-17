import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  color,
  fullWidth = false,
  label,
  fontSize,
  width,
  sx: customSx = {},
  ...props
}) => {
  let buttonColor = "#F8B959";
  let labelColor = "#000";

  if (color === "cancel") {
    buttonColor = "#FDEACD";
  }

  if (color === "delete") {
    buttonColor = "#F95A50";
  }

  return (
    <Button
      fullWidth={fullWidth}
      sx={{
        width: width ? width : "35%",
        borderRadius: "50px",
        backgroundColor: buttonColor,
        color: labelColor,
        "&:hover": {
          backgroundColor: buttonColor,
          opacity: 0.8,
        },
        textTransform: "none",
        fontSize: fontSize ? fontSize : "16px",
        ...customSx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
