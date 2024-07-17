import React from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import usePostDetailService from "./service";
import PostCard from "../../components/Card/PostCard";
import TopButton from "../../components/TopButton";

const PostDetail = () => {
  const { post, loading, error } = usePostDetailService();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!post) {
    return <Typography>No post found.</Typography>;
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {/* Header Button*/}
        <TopButton />
        {/* Title */}
        <Box sx={{ textAlign: "center", marginBottom: "2%" }}>
          <Typography variant="h5">View Post</Typography>
        </Box>

        {/* Post Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <PostCard fullWidth post={post} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PostDetail;
