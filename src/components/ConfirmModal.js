import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./Button";

export default function ConfirmModal({
  open,
  handleClose,
  handleConfirm,
  post,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", width: "40%", padding: "2%" },
      }}
      sx={{
        "& .MuiDialogTitle-root": {
          textAlign: "center",
          color: "#F95A50",
        },
        "& .MuiDialogContent-root": {
          textAlign: "center",
        },
        "& .MuiDialogContentText-root": {
          color: "black",
        },
        "& .MuiDialogActions-root": {
          justifyContent: "center",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {post ? post.title : ""}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "18px" }}
        >
          Are you sure you want to delete this post ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton label="Cancel" color="cancel" onClick={handleClose} />
        <CustomButton label="Delete" color="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}
