import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import useFavorites from "utils/hooks/useFavorites";
import { SmallCard } from "components/Common/SmallCard";

const imgURL = "https://starwars-visualguide.com/assets/img/";

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  const extractTypeAndId = (url: string) => {
    const regex = /https:\/\/swapi.dev\/api\/(\w+)\/(\d+)\//;
    const match = url.match(regex);

    if (match) {
      const [, type, id] = match;
      return { type, id };
    } else {
      return null;
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "white" }}
        mt={15}
        mb={5}
      >
        My Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="h6" align="center">
          You haven't added any favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((favorite) => {
            console.log(favorite);
            const result = extractTypeAndId(favorite.url);
            return (
              <Grid key={favorite.id} item xs={12} sm={6} md={4} lg={3}>
                <SmallCard
                  type={result?.type ?? ""}
                  id={result?.id ?? ""}
                  name={favorite.name}
                  age={favorite.age}
                  imageUrl={`${imgURL}/${
                    result?.type === "people" ? "characters" : result?.type
                  }/${result?.id}.jpg`}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
