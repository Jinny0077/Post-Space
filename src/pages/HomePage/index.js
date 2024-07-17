import React from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import PostCard from "../../components/Card/PostCard";
import useHomePageService from "./service";
import PaginationRounded from "../../components/Pagination";
import InfoCard from "../../components/Card/InfoCard";
import Spacer from "../../components/Spacer";
import CreateModal from "../../components/CreateModal";
import ConfirmModal from "../../components/ConfirmModal";
import TopButton from "../../components/TopButton";

export default function HomePage() {
  const {
    posts,
    handlePageChange,
    page,
    totalPages,
    totalPosts,
    totalAccounts,
    totalMyPosts,
    handleConfirmModalOpen,
    handleConfirmModalClose,
    handleConfirmDelete,
    currentPostId,
    open,
    isModalVisible,
    handleClose,
    control,
    handleSubmit,
    isEdit,
    onSubmit,
    createError,
    handleEditClick,
    isAdminAcc,
    loading,
    showModal,
  } = useHomePageService();

  return (
    <>
      {/* Header Button*/}
      <TopButton showModal={showModal} />

      {/* Content */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: "100%" }}>
          {/* Title */}
          <Box sx={{ textAlign: "center", marginBottom: "2%" }}>
            <Typography variant="h5">Post List</Typography>
          </Box>

          {/* Admin Access */}
          {isAdminAcc ? (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <InfoCard
                    sx={{ backgroundColor: "#FDEACD" }}
                    title="Total Account"
                    total={totalAccounts}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InfoCard
                    sx={{ backgroundColor: "#E6A5A1" }}
                    title="Total Post"
                    total={totalPosts}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InfoCard
                    sx={{ backgroundColor: "#DBF9CC" }}
                    title="My Post"
                    total={totalMyPosts}
                  />
                </Grid>
              </Grid>
              <Spacer height={30} />
            </>
          ) : null}

          {/* Post Cards */}
          <Grid container spacing={3}>
            {posts &&
              posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.date}>
                  <PostCard
                    post={post}
                    handleConfirmModalOpen={handleConfirmModalOpen}
                    setCurrentPostId={currentPostId}
                    handleEditClick={() => handleEditClick(post.id)}
                  />
                </Grid>
              ))}
          </Grid>

          {/* Pagination */}
          <Box mt={3} display="flex" justifyContent="center">
            <PaginationRounded
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}

      {/* Create Edit Modal */}

      <CreateModal
        isModalVisible={isModalVisible}
        handleClose={handleClose}
        control={control}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        onSubmit={onSubmit}
        createError={createError}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        post={posts.find((post) => post.id === currentPostId)}
        open={open}
        handleClose={handleConfirmModalClose}
        handleConfirm={() => handleConfirmDelete(currentPostId)}
      />
    </>
  );
}
