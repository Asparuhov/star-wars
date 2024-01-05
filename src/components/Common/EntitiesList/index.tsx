import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import { SmallCard } from "components/Common/SmallCard";
import { getId } from "utils/getId";

interface EntitiesListProps {
  entityType: string;
  dataUrl: string;
  imgUrl: string;
  searchTriggered?: boolean;
  fetchDataOnMount?: boolean;
}

const EntitiesList: React.FC<EntitiesListProps> = ({
  entityType,
  dataUrl,
  imgUrl,
  searchTriggered = false,
  fetchDataOnMount = false,
}) => {
  const [entities, setEntities] = useState<Array<any>>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<boolean>(false);

  useEffect(() => {
    if (fetchDataOnMount) {
      fetchData(dataUrl);
    } else if (searchTriggered) {
      setEntities([]);
      setNextPage(null);
      setSearchError(false); // Set searchError to false on searchTriggered
      fetchData(dataUrl);
    }
  }, [dataUrl, searchTriggered, fetchDataOnMount]);

  const fetchData = (url: string) => {
    setLoadingMore(true);
    axios
      .get(url)
      .then((res: any) => {
        setEntities((prevEntities) => {
          if (nextPage) {
            return [...prevEntities, ...res.data.results];
          } else {
            return res.data.results;
          }
        });
        setNextPage(res.data.next);
      })
      .catch((error: any) => {
        console.error(`Error fetching ${entityType} data:`, error);
        setSearchError(true);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const handleLoadMore = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };
  console.log(imgUrl);
  
  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {entities.length === 0 && !loadingMore && !searchError && searchTriggered && (
          <Typography
            variant="h6"
            textAlign="center"
            color="error"
            mb={5}
            mt={-5}
          >
            No results found.
          </Typography>
        )}

        {entities.map((entity: any) => {
          console.log(`${imgUrl + getId(entity.url)}.jpg`);
          return (
            <Grid key={entity.name} item xs={12} sm={6} md={4} lg={3}>
              <SmallCard
                id={getId(entity.url)}
                type={entityType.toLowerCase()}
                name={entity.name || entity.title}
                age={entity[0]}
                imageUrl={`${imgUrl}/${getId(entity.url)}.jpg`}
              />
            </Grid>
          );
        })}
      </Grid>

      {loadingMore && (
        <CircularProgress
          style={{ margin: "20px auto", display: "block" }}
          size={100}
        />
      )}

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
