import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomButton from "./Button";
import Spacer from "./Spacer";

export default function MsgModal({ open, onClose, message, status }) {
  const isSuccess = status === 200 || status === 201;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "30px",
          py: "3%",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        {isSuccess ? (
          <CheckCircleIcon sx={{ fontSize: 50, color: "green" }} />
        ) : (
          <CancelOutlinedIcon sx={{ fontSize: 50, color: "red" }} />
        )}
      </DialogTitle>

      <DialogContent sx={{ justifyContent: "center", textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontSize: "30px" }}>
          {message}
        </Typography>
      </DialogContent>
      {!isSuccess ? (
        <>
          <Spacer height={13} />
          <DialogActions sx={{ justifyContent: "center" }}>
            <CustomButton onClick={onClose} label="Ok" fontSize="25px" />
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}
