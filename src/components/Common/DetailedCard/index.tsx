import { useEffect, useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { styled } from "@mui/system";
import { IDetailedCardProps } from "types/common";
import axios from "axios";

// Styled components
const ArrayContainer = styled("div")({
  border: "1px solid #ccc",
  padding: 8,
  margin: "8px 0",
  width: "100%", // Set a fixed width
});

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
  const formatPropertyName = (propertyName: string) => {
    return propertyName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderProperty = (key: string, value: string | any[]) => {
    if (key === "url" || typeof value === "object") {
      return null;
    }

    if (key === "height") {
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: ${value} cm`}
        </Typography>
      );
    } else if (key === "mass") {
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: ${value} kg`}
        </Typography>
      );
    } else if (
      (key === "created" || key === "edited") &&
      typeof value === "string"
    ) {
      const date = new Date(value);
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: ${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}
        </Typography>
      );
    } else if (
      typeof value === "string" &&
      value.toLowerCase().includes("https://")
    ) {
      return (
        <Typography key={key}>
          {`${formatPropertyName(key)}: `}
          <a href={value} target="_blank" rel="noopener noreferrer">
            View Entity
          </a>
        </Typography>
      );
    } else {
      return (
        <Typography key={key}>{`${formatPropertyName(
          key
        )}: ${value}`}</Typography>
      );
    }
  };

  const [fetchedEntities, setFetchedEntities] = useState<ReactNode[]>([]);

  const fetchAndRenderEntities = async () => {
    const entityPromises = Object.entries(data)
      .filter(
        ([key, value]) =>
          Array.isArray(value) && value.length > 0 && key !== "films"
      )
      .map(async ([key, value]) => {
        const entitiesData = await Promise.all(
          value.map(async (endpoint: string) => {
            try {
              const response = await axios.get(endpoint);
              return response.data;
            } catch (error) {
              console.error(`Error fetching ${key} data:`, error);
              return null;
            }
          })
        );

        const entities = entitiesData
          .filter((data) => data !== null)
          .map((data, index) => (
            <Typography key={index}>
              {`${index + 1}. `}
              {`${data.name} - `}
              <a href={value[index]} target="_blank" rel="noopener noreferrer">
                ViewEntity
              </a>
            </Typography>
          ));

        return (
          <ArrayContainer key={key}>
            <Typography variant="h6">{formatPropertyName(key)}</Typography>
            {entities.length > 0 ? entities : "No entities available"}
          </ArrayContainer>
        );
      });

    setFetchedEntities(await Promise.all(entityPromises));
  };

  const StyledCard = styled(Card)({
    display: "flex",
    maxWidth: 600,
  });

  useEffect(() => {
    // Fetch entities when the component mounts
    fetchAndRenderEntities();
  }, []);

  return (
    <div className="detailed-card-container">
      <StyledCard>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", width: 300 }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            {Object.entries(data).map(([key, value]) =>
              renderProperty(key, value)
            )}
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          image={imageUrl}
          alt="Live from space album cover"
        />
      </StyledCard>
      {fetchedEntities.length > 0 && <ArrayBoxes>{fetchedEntities}</ArrayBoxes>}
    </div>
  );
};
