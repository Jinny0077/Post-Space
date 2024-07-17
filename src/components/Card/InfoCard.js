import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Spacer from "../Spacer";

const InfoDetailCard = ({ title, total }) => (
  <>
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Spacer height={15} />
      <Typography variant="h4">{total}</Typography>
      <Spacer height={15} />
    </CardContent>
  </>
);

export default function InfoCard({ title, total, sx: customSx = {} }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: "15px",
          paddingTop: "2%",
          ...customSx,
        }}
      >
        <InfoDetailCard title={title} total={total} />
      </Card>
    </Box>
  );
}
