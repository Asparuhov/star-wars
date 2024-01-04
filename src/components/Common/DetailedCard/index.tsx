import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { IDetailedCardProps } from "types/common";
import { useNavigate } from "react-router-dom";
import missingImageSrc from "assets/missingImage.jpg";
import useDetailedCard from "utils/hooks/useDetailedCard";
import { formatPropertyName } from "utils/formatPropertyName";

const ArrayBoxes = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  width: "100%",
  paddingTop: 20,
  boxSizing: "border-box", // Include padding in the width calculation
});

// Component
export const DetailedCard: React.FC<IDetailedCardProps> = ({
  name,
  imageUrl,
  data,
}) => {
  // Hooks
  const navigate = useNavigate();

  const { fetchedEntities } = useDetailedCard(data);

  // Render individual property based on key and value
  const renderProperty = (key: string, value: any) => {
    if (key === "url" || typeof value === "object") {
      return null;
    }

    if (key === "height" || key === "mass") {
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: ${value} ${
            key === "height" ? "cm" : "kg"
          }`}
        </Typography>
      );
    }

    if ((key === "created" || key === "edited") && typeof value === "string") {
      const date = new Date(value);
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: ${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}
        </Typography>
      );
    }

    if (typeof value === "string" && value.toLowerCase().includes("https://")) {
      // Render hyperlinks for URLs
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: `}
          <Typography
            color="secondary"
            sx={{ display: "inline", ":hover": { cursor: "pointer" } }}
            onClick={() => {
              // Navigate to the linked entity and reload the page
              navigate(
                `/${value.split("/").filter(Boolean).slice(3).join("/")}`
              );
              window.location.reload();
            }}
          >
            View Entity
          </Typography>
        </Typography>
      );
    }

    // Default case for other properties
    return (
      <Typography key={key}>{`${formatPropertyName(
        key
      )}: ${value}`}</Typography>
    );
  };

  // Component JSX
  return (
    <div className="detailed-card-container">
      <StyledCard>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", width: 300 }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            {/* Render properties */}
            {Object.entries(data).map(([key, value]) =>
              renderProperty(key, value)
            )}
          </CardContent>
        </Box>
        {/* Display image with error handling */}
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          image={imageUrl}
          alt="Live from space album cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src = missingImageSrc;
          }}
        />
      </StyledCard>
      {<ArrayBoxes>{fetchedEntities}</ArrayBoxes>}
    </div>
  );
};

const StyledCard = styled(Card)({
  display: "flex",
  maxWidth: 600,
});
