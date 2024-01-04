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

const useDetailedCard = (data: IDataType) => {
  const { id } = useParams();
  const [fetchedEntities, setFetchedEntities] = useState<React.ReactNode[]>([]);
  const navigate = useNavigate();

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
              <Typography
                color="secondary"
                sx={{ display: "inline", ":hover": { cursor: "pointer" } }}
                onClick={() => {
                  // Assuming navigate and window.location.reload are available
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

        return (
          <ArrayContainer key={key}>
            <Typography variant="h6">{formatPropertyName(key)}</Typography>
            {entities.length > 0 ? entities : "No entities available"}
          </ArrayContainer>
        );
      });

    setFetchedEntities(await Promise.all(entityPromises));
  };

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
