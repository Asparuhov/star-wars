import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, CircularProgress, Button } from "@mui/material";
import { SmallCard } from "components/Common/SmallCard";
import { getId } from "utils/getId";

interface EntitiesListProps {
  entityType: string;
  dataUrl: string;
  imgUrl: string;
  searchTriggered?: boolean;
  fetchDataOnMount?: boolean; // New prop for fetching data on mount
}

const EntitiesList: React.FC<EntitiesListProps> = ({
  entityType,
  dataUrl,
  imgUrl,
  searchTriggered = false,
  fetchDataOnMount = false,
}) => {
  // State to store the list of entities
  const [entities, setEntities] = useState<Array<any>>([]);
  // State to track loading state during data fetching
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  // State to store the URL for the next page of entities
  const [nextPage, setNextPage] = useState<string | null>(null);

  // useEffect hook to fetch data based on props and triggers
  useEffect(() => {
    // Fetch data on mount if specified
    if (fetchDataOnMount) {
      fetchData(dataUrl);
    }
    // Fetch data when a search is triggered
    else if (searchTriggered) {
      // Clear entities when search is triggered
      setEntities([]);
      setNextPage(null);
      fetchData(dataUrl);
    }
  }, [dataUrl, searchTriggered, fetchDataOnMount]);

  // Function to fetch data from the specified URL
  const fetchData = (url: string) => {
    setLoadingMore(true);
    axios
      .get(url)
      .then((res: any) => {
        setEntities((prevEntities) => {
          // Append new entities to the existing list
          if (nextPage) {
            return [...prevEntities, ...res.data.results];
          }
          // Set the entities to the new list if no pagination
          else {
            return res.data.results;
          }
        });
        // Update the URL for the next page
        setNextPage(res.data.next);
      })
      .catch((error: any) => {
        console.error(`Error fetching ${entityType} data:`, error);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  // Function to handle loading more entities on button click
  const handleLoadMore = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  // JSX structure for rendering the list of entities
  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Map through the list of entities and render SmallCard components */}
        {entities.map((entity: any) => {
          return (
            <Grid
              key={entity.name}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <SmallCard
                id={getId(entity.url)}
                type={entityType}
                name={entity.name || entity.title}
                age={entity[0]}
                imageUrl={`${imgUrl + getId(entity.url)}.jpg`}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* Loading spinner while fetching more entities */}
      {loadingMore && (
        <CircularProgress
          style={{ margin: "20px auto", display: "block" }}
          size={100}
        />
      )}
      {/* Button to load more entities if there is a next page */}
      {nextPage && !loadingMore && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          style={{ margin: "20px auto", display: "block" }}
        >
          Load More
        </Button>
      )}
    </Container>
  );
};

export default EntitiesList;
