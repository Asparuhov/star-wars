import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, CircularProgress, Button } from "@mui/material";
import { SmallCard } from "components/Common/SmallCard";
import { useEntityContext } from "contexts/entity";

const imgURL = "https://starwars-visualguide.com/assets/img/characters/";

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Array<any>>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const { setCurrentEntity } = useEntityContext();

  useEffect(() => {
    fetchData("https://swapi.dev/api/people");
  }, []);

  const fetchData = (url: string) => {
    setLoadingMore(true);
    axios
      .get(url)
      .then((res: any) => {
        setPeople((prevPeople) => {
          if (nextPage) {
            // Only append new data when loading more
            return [...prevPeople, ...res.data.results];
          } else {
            // Set the initial data
            return res.data.results;
          }
        });
        setNextPage(res.data.next);
      })
      .catch((error: any) => {
        console.error("Error fetching people data:", error);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  //getting the id from the api endpoint
  function getId(url: string) {
    return url.split("/")[url.split("/").length - 2];
  }

  const handleLoadMore = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} mt={10}>
        {people.map((person: any) => (
          <Grid key={person.name} item xs={12} sm={6} md={4} lg={3} onClick={() => setCurrentEntity(person)}>
            <SmallCard
              id={getId(person.url)}
              type="people"
              name={person.name}
              age={person.age}
              imageUrl={`${imgURL + getId(person.url)}.jpg`} //aligning the id with the another api built on top of swapi
            />
          </Grid>
        ))}
      </Grid>
      {loadingMore && (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
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

export default PeoplePage;
