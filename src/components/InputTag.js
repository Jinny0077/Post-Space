import React from "react";
import { Autocomplete, TextField, Chip, Box } from "@mui/material";

const TagsInput = ({ value, onChange, error, helperText }) => {
  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "15px",
          border: "2px solid #F8B959",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: "3px solid #F8B959",
          },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#F8B959",
        },
      }}
    >
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={value || []}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              sx={{
                backgroundColor: "#E0E0E0",
                color: "#333333",
                "& .MuiChip-deleteIcon": {
                  display: "none",
                },
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} error={!!error} helperText={helperText} />
        )}
      />
    </Box>
  );
};

export default TagsInput;
