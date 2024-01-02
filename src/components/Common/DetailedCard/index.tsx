import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { styled } from "@mui/system";
import { IDetailedCardProps } from "types/common";

export const DetailedCard: React.FC<IDetailedCardProps> = ({
  name,
  imageUrl,
  data,
}) => {
  return (
    <StyledCard>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", width: 100 }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={imageUrl}
        alt="Live from space album cover"
      />
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  display: "flex",
  maxWidth: 300,
  transition: "transform 0.2s", // Add smooth transition for the zoom effect
  ":hover": {
    transform: "scale(1.1)", // Zoom in by 10% on hover
    cursor: "pointer",
  },
});
