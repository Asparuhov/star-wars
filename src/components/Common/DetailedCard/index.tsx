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
  const formatPropertyName = (propertyName: string) => {
    // Replace underscores with spaces and capitalize each word
    return propertyName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderProperty = (key: string, value: string) => {
    // Exclude properties that are arrays or objects
    if (Array.isArray(value) || typeof value === "object") {
      return null;
    }

    // Special formatting for 'height' and 'mass'
    if (key === "height") {
      return (
        <Typography key={key}>{`${formatPropertyName(
          key
        )}: ${value} cm`}</Typography>
      );
    } else if (key === "mass") {
      return (
        <Typography key={key}>{`${formatPropertyName(
          key
        )}: ${value} kg`}</Typography>
      );
    } else if (key === "created" || key === "edited") {
      // Format date properties
      const date = new Date(value);
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: ${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}
        </Typography>
      );
    }

    // Default rendering for other properties
    return (
      <Typography key={key}>{`${formatPropertyName(
        key
      )}: ${value}`}</Typography>
    );
  };

  return (
    <StyledCard>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", width: 100 }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          {/* Render properties from the data object */}
          {Object.entries(data).map(([key, value]) =>
            renderProperty(key, value)
          )}
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
