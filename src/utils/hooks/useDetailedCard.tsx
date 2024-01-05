// Import necessary React hooks and components from external libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, styled } from "@mui/material";
import { formatPropertyName } from "utils/formatPropertyName";

export interface IDetailedCardHook {
  fetchedEntities: React.ReactNode[];
}

type IDataType = {
  [key: string]: any;
};

// Custom hook to fetch and render detailed information about related entities
const useDetailedCard = (data: IDataType) => {
  // Extract the "id" parameter from the route
  const { id } = useParams();
  // State to store the rendered entities as React nodes
  const [fetchedEntities, setFetchedEntities] = useState<React.ReactNode[]>([]);
  // Access the navigation function from React Router
  const navigate = useNavigate();

  // Function to fetch and render entities based on the provided data
  const fetchAndRenderEntities = async () => {
    // Map over the data entries to create an array of promises for each entity type
    const entityPromises = Object.entries(data)
      .filter(
        ([key, value]) =>
          Array.isArray(value) && value.length > 0 && key !== "films"
      )
      .map(async ([key, value]) => {
        // Fetch data for each entity in parallel using Promise.all
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

        // Map over the fetched data to create React nodes for each entity
        const entities = entitiesData
          .filter((data) => data !== null)
          .map((data, index) => (
            <Typography key={index}>
              {`${index + 1}. `}
              {`${data.name} - `}
              <Typography
                color="secondary"
                sx={{ display: "inline", ":hover": { cursor: "pointer" } }}
                onClick={() => {
                  // Navigate to the linked entity and reload the page
                  navigate(
                    `/${value[index]
                      .split("/")
                      .filter(Boolean)
                      .slice(3)
                      .join("/")}`
                  );
                  window.location.reload();
                }}
              >
                View Entity
              </Typography>
            </Typography>
          ));

        // Create a container for the entities and their type
        return (
          <ArrayContainer key={key}>
            <Typography variant="h6">{formatPropertyName(key)}</Typography>
            {entities.length > 0 ? entities : "No entities available"}
          </ArrayContainer>
        );
      });

    // Set the state with the rendered entities once all promises are resolved
    setFetchedEntities(await Promise.all(entityPromises));
  };

  // Use useEffect to trigger the fetchAndRenderEntities function when the "id" changes
  useEffect(() => {
    fetchAndRenderEntities();
  }, [id]);

  return { fetchedEntities };
};

export default useDetailedCard;

const ArrayContainer = styled("div")({
  border: "1px solid #ccc",
  padding: 8,
  margin: "8px 0",
  width: "100%",
  backgroundColor: "white",
});
