import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, CircularProgress, Button } from "@mui/material";
import { SmallCard } from "components/Common/SmallCard";
import { useEntityContext } from "contexts/entity";
import { getId } from "utils/getId";

interface EntityPageProps {
  entityType: string;
  dataUrl: string;
  imgUrl: string;
}

const EntityPage: React.FC<EntityPageProps> = ({
  entityType,
  dataUrl,
  imgUrl,
}) => {
  const [entities, setEntities] = useState<Array<any>>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const { setCurrentEntity } = useEntityContext();

  useEffect(() => {
    fetchData(dataUrl);
  }, [dataUrl]);

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

  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {entities.map((entity: any) => {
          return (
            <Grid
              key={entity.name}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => setCurrentEntity(entity)}
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

export default EntityPage;
