import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { Header } from "../components/Header";
import CreateModal from "../components/CreateModal";
import useHomePageService from "./HomePage/service";

function RootLayout() {
  const {
    control,
    handleSubmit,
    createError,
    isModalVisible,
    isEdit,
    handleClose,
    onSubmit,
  } = useHomePageService();
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
  }, [token, submit]);

  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {token ? <Header /> : null}
      <Container
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Outlet />
        <CreateModal
          isModalVisible={isModalVisible}
          handleClose={handleClose}
          control={control}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
          onSubmit={onSubmit}
          createError={createError}
        />
      </Container>
    </div>
  );
}

export default RootLayout;
