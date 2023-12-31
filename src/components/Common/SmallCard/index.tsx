import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { styled } from "@mui/system";
import { ICardProps } from "types/common";
import { useNavigate } from "react-router-dom";
import missingImageSrc from "assets/missingImage.jpg";

export const SmallCard: React.FC<ICardProps> = ({
  type,
  id,
  name,
  age,
  imageUrl,
}) => {
  const navigate = useNavigate();

  return (
    <StyledCard onClick={() => navigate(`/${type}/${id}`)}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", width: 110 }}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {age}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 161, height: 151 }}
        image={imageUrl}
        alt={name}
        //on missing image, add a default one
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.src = missingImageSrc;
        }}
      />
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  display: "flex",
  maxWidth: 301,
  transition: "transform 0.2s", // Add smooth transition for the zoom effect
  margin: "auto",
  marginBottom: 30,
  ":hover": {
    transform: "scale(1.1)", // Zoom in by 10% on hover
    cursor: "pointer",
  },
});
