import React from "react";
import {
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import classes from "./Input.module.css";

export default function Input(props) {
  const {
    rows,
    name,
    label,
    value,
    error = null,
    helperText,
    onChange,
    fullWidth = true,
    disabled,
    type,
    multiline,
    shrink,
    options,
    sx: customSx = {},
    content,
  } = props;

  if (type === "select") {
    return (
      <Box sx={{ width: "100%", mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 0.5, ml: 2 }}>
          {label}
        </Typography>
        <FormControl
          fullWidth={fullWidth}
          error={!!error}
          variant="outlined"
          sx={{
            borderRadius: "50px",
          }}
        >
          <Select
            className={classes.customSelect}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            variant="outlined"
            disabled={disabled}
            sx={{
              ".MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px",
                borderColor: "#F8B959",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F8B959",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F8B959",
              },
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
              "& .MuiInputBase-input": {
                py: 1,
                px: 2,
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="body1" sx={{ mb: 0.5, ml: 2 }}>
        {label}
      </Typography>

      <TextField
        InputLabelProps={{ shrink: shrink }}
        disabled={disabled}
        variant="outlined"
        name={name}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        multiline={multiline}
        minRows={3}
        rows={rows}
        {...(error && { error: true, helperText: helperText })}
        type={type}
        sx={
          content === true
            ? {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  "& fieldset": {
                    borderColor: "#F8B959",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F8B959",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F8B959",
                    borderWidth: "3px",
                  },
                },
              }
            : {
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "#F8B959",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F8B959",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F8B959",
                    borderWidth: "3px",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1,
                  px: 2,
                },
                ...customSx,
              }
        }
      />
    </Box>
  );
}
