import { Box } from "@mui/material";
import CustomButton from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function TopButton({ showModal }) {
  const location = useLocation();
  const navigate = useNavigate();

  const clickBack = () => {
    navigate("/homepage");
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginRight: "80%",
        marginTop: "-7%",
        marginBottom: "5%",
        width: "20%",
      }}
    >
      {location.pathname === "/homepage" ? (
        <CustomButton label="Add New Post" width="70%" onClick={showModal} />
      ) : (
        <CustomButton label="Back" width="50%" onClick={clickBack} />
      )}
    </Box>
  );
}
