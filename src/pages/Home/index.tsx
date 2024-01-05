import React, { useState } from "react";
import SearchBar from "components/Common/Search";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  styled,
} from "@mui/material";
import { memeImages } from "utils/randomMemes";

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * memeImages.length);
  return memeImages[randomIndex];
};

const HomePage: React.FC = () => {
  const [randomImage, setRandomImage] = useState(getRandomImage);

  const handleButtonClick = () => {
    setRandomImage(getRandomImage());
  };

  return (
    <>
      <SearchBar />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ color: "white" }} textAlign="center">
          Random Star Wars Meme generator
        </Typography>
        <StyledCard>
          <CardMedia
            component="img"
            alt="Random Meme"
            src={randomImage}
            style={{ width: "300px", marginTop: 10 }}
          />
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              style={{ marginTop: "10px" }}
            >
              Show Another Meme
            </Button>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  );
};

export default HomePage;

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: 350,
    marginBottom: 10,
  },
}));
