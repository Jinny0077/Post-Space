import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import Input from "../Input/Input";
import CustomButton from "../Button";
import TagsInput from "../InputTag";
import Spacer from "../Spacer";

export default function CreateModal({
  isModalVisible,
  handleClose,
  control,
  handleSubmit,
  isEdit,
  onSubmit,
  createError,
}) {
  return (
    <Dialog
      open={isModalVisible}
      onClose={handleClose}
      maxWidth="xl"
      PaperProps={{
        sx: { borderRadius: "20px", width: "50%" },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <DialogTitle sx={{ fontSize: "35px", textAlign: "center" }}>
            {isEdit ? "Edit Post" : "Add A Post"}
          </DialogTitle>

          <DialogContent>
            <Box display={"flex"} mb={2}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    {...field}
                    label="Title"
                    type="text"
                    error={createError?.title?.message ? true : false}
                    helperText={createError?.title?.message}
                  />
                )}
              />
            </Box>
            <Box display={"flex"} mb={2}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    multiline
                    {...field}
                    label="Content"
                    type="text"
                    error={createError?.content?.message ? true : false}
                    helperText={createError?.content?.message}
                    content
                  />
                )}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Box>
                <Typography variant="body1" sx={{ mb: 0.5, ml: 2 }}>
                  Tags
                </Typography>
              </Box>
              <Controller
                name="tag"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    {...field}
                    error={!!createError?.tag?.message}
                    helperText={createError?.tag?.message}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <Spacer height={30} />
          <DialogActions
            sx={{
              display: "flex",
              padding: "20px 24px",
              marginTop: "-45px",
              justifyContent: "center",
            }}
          >
            <Box display={"flex"} width="100%" justifyContent="space-between">
              <CustomButton
                color="cancel"
                label="Cancel"
                onClick={handleClose}
              />
              <CustomButton type="submit" label="Save" />
            </Box>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
}
