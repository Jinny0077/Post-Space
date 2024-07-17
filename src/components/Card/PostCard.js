import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomButton from "../Button";
import Chip from "@mui/material/Chip";
import Spacer from "../Spacer";
import { useLocation, useNavigate } from "react-router-dom";

const PostCard = ({ post, handleConfirmModalOpen, handleEditClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const clickView = () => {
    navigate(`/${post.id}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card variant="outlined" sx={{ borderRadius: "15px", padding: "3%" }}>
        <CardContent>
          {location.pathname === "/homepage" && (
            <>
              <Typography
                sx={{ fontSize: 14, color: "#F8B959" }}
                color="text.secondary"
                gutterBottom
              >
                {post.date}
              </Typography>
              <Spacer height={15} />
            </>
          )}
          <Typography
            variant="h6"
            sx={{ fontWeight: location.pathname === "/homepage" ? 400 : 600 }}
            component="div"
          >
            {post.title}
          </Typography>
          <Spacer height={15} />
          <Typography variant="body1">{post.body}</Typography>
          <Spacer height={15} />
          <Box>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                style={{
                  backgroundColor: "#FDEACD",
                  color: "#000",
                  marginRight: 5,
                  marginBottom: 5,
                }}
              />
            ))}
          </Box>
        </CardContent>
        {location.pathname === "/homepage" && (
          <CardActions>
            <CustomButton
              label="Edit"
              onClick={handleEditClick}
              sx={{
                fontSize: "0.8125rem",
                backgroundColor: "#DBF9CC",
                color: "#000",
                padding: "1%",
              }}
            />
            <CustomButton
              label="View"
              sx={{ fontSize: "0.8125rem", padding: "1%" }}
              onClick={clickView}
            />
            <CustomButton
              label="Delete"
              onClick={() => handleConfirmModalOpen(post.id)}
              sx={{
                fontSize: "0.8125rem",
                backgroundColor: "#F95A50",
                color: "#000",
                padding: "1%",
              }}
            />
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default PostCard;
