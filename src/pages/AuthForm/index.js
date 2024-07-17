import { Box, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Controller } from "react-hook-form";
import { useAuthentication } from "./service";
import CustomButton from "../../components/Button";
import MsgModal from "../../components/MsgModal";
import { Link, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import Input from "../../components/Input/Input";
import Spacer from "../../components/Spacer";

export default function AuthForm() {
  const {
    authenticationError,
    control,
    handleSubmit,
    onSubmit,
    handleLinkClick,
    handleCloseModal,
    msgModalOpen,
    msgModalStatus,
    msgModalMessage,
  } = useAuthentication();

  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      margin="70px"
    >
      <Box className={classes.authFormInnerContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontSize: "35px", textAlign: "center" }}>
            {isLogin ? " Login Page" : "Register User"}
          </DialogTitle>
          <Spacer heigh={20} />
          <DialogContent>
            {!isLogin ? (
              <>
                <Box display={"flex"}>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        fullWidth
                        {...field}
                        label="Username"
                        type="text"
                        error={
                          authenticationError?.username?.message ? true : false
                        }
                        helperText={authenticationError?.username?.message}
                      />
                    )}
                  />
                </Box>
                <Spacer height={10} />
              </>
            ) : null}
            <Box display={"flex"}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    {...field}
                    label="Email"
                    type="text"
                    error={authenticationError?.email?.message ? true : false}
                    helperText={authenticationError?.email?.message}
                  />
                )}
              />
            </Box>
            <Spacer height={10} />
            <Box display={"flex"}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    fullWidth
                    {...field}
                    label="Password"
                    type="text"
                    error={
                      authenticationError?.password?.message ? true : false
                    }
                    helperText={authenticationError?.password?.message}
                  />
                )}
              />
            </Box>
            {!isLogin ? (
              <>
                <Spacer height={10} />
                <Box display={"flex"}>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Input
                        fullWidth
                        {...field}
                        label="Role"
                        type="select"
                        options={["admin", "user"]}
                        error={
                          authenticationError?.role?.message ? true : false
                        }
                        helperText={authenticationError?.role?.message}
                      />
                    )}
                  />
                </Box>
              </>
            ) : null}
          </DialogContent>
          <DialogActions sx={{ padding: "20px 24px", marginTop: "-10px" }}>
            <Box display={"flex"} width="100%">
              <CustomButton
                sx={{ width: "100%" }}
                type="submit"
                label={isLogin ? "Login" : "Register"}
              />
            </Box>
          </DialogActions>
          <Spacer height={5} />
          <Box
            display={"flex"}
            width="100%"
            justifyContent="center"
            className={classes.actions}
          >
            <Link
              to={`?mode=${isLogin ? "register" : "login"}`}
              onClick={handleLinkClick}
            >
              {isLogin ? "Create an account" : "Back to Login Page"}
            </Link>
          </Box>
        </form>
      </Box>
      {/* Render the MsgModal */}
      <MsgModal
        open={msgModalOpen}
        onClose={handleCloseModal}
        status={msgModalStatus}
        message={msgModalMessage}
      />
    </Box>
  );
}
