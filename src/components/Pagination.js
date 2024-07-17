import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({ ...props }) {
  return (
    <Stack spacing={2}>
      <Pagination
        {...props}
        variant="outlined"
        shape="rounded"
        hidePrevButton
        hideNextButton
        sx={{
          "& .MuiPaginationItem-root": {
            backgroundColor: "#fff",
          },
          "& .Mui-selected": {
            color: "#000",
            backgroundColor: "#F8B959  !important",
            borderColor: "#F8B959",
          },
        }}
      />
    </Stack>
  );
}
