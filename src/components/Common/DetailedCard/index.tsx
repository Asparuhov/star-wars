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

export const DetailedCard: React.FC<IDetailedCardProps> = ({
  name,
  imageUrl,
  data,
}) => {
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

    return (
      <Typography key={key}>{`${formatPropertyName(
        key
      )}: ${value}`}</Typography>
    );
  };

  return (
    <div className="detailed-card-container">
      <StyledCard>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" textAlign="center">
            {name}
          </Typography>
          {/* Render properties */}
          {Object.entries(data).map(([key, value]) =>
            renderProperty(key, value)
          )}
        </CardContent>
        {/* Display image with error handling */}
        <CardMedia
          component="img"
          sx={{ width: 250, paddingTop: { xs: 2, sm: 0 } }}
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

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", // Display in a row on large screens
  alignItems: "center", // Center items vertically
  maxWidth: 600,
  margin: "0 auto", // Center the card horizontally
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    margin: "100px 40px 0px 40px",
    padding: 20, // Stack items vertically on small screens
  },
}));

const ArrayBoxes = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  paddingTop: 20,
  boxSizing: "border-box", // Include padding in the width calculation
  margin: 0,
  [theme.breakpoints.down("sm")]: {
    margin: "0px 40px 0px 40px",
  },
}));
