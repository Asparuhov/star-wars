import React, { useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PublicIcon from "@mui/icons-material/Public";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CommuteIcon from "@mui/icons-material/Commute";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import EntitiesList from "components/Common/EntitiesList";

const categoryIcons: any = {
  Planets: <PublicIcon />,
  People: <PeopleAltIcon />,
  Starships: <RocketLaunchIcon />,
  Vehicles: <CommuteIcon />,
  Species: <EmojiNatureIcon />,
};

const apiEndpoints: any = {
  People: "https://swapi.dev/api/people/",
  Planets: "https://swapi.dev/api/planets/",
  Species: "https://swapi.dev/api/species/",
  Starships: "https://swapi.dev/api/starships/",
  Vehicles: "https://swapi.dev/api/vehicles/",
};

const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#1976d2",
  "&:hover": {
    backgroundColor: alpha("#1976d2", 0.85),
  },
  textAlign: "center",
  height: "50px",
  margin: "130px auto 0px auto",
  width: 600,
  [theme.breakpoints.down("sm")]: {
    width: 350,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const SearchBar: React.FC = () => {
  const [searchMode, setSearchMode] = useState("People");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchValueRef = useRef<string | null>(null);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false); // New state

  const handleModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchMode(event.target.value as string);
    setSearchButtonClicked(false); // Reset the search button click status
  };

  const handleSearch = () => {
    if (
      searchMode !== "All" &&
      searchValueRef.current &&
      searchValueRef.current.trim() !== ""
    ) {
      const endpoint = `${apiEndpoints[searchMode]}?search=${searchValueRef.current}`;
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results || []);
          setSearchTriggered(true);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      setSearchResults([]);
      setSearchTriggered(true);
    }

    setSearchButtonClicked(true); // Set search button click status to true
  };

  return (
    <Container>
      <SearchWrapper>
        <StyledInputBase
          placeholder={`Search ${searchMode.toLowerCase()}...`}
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => {
            searchValueRef.current = event.target.value;
          }}
        />
        <Select
          value={searchMode}
          onChange={(e: any) => handleModeChange(e)}
          disableUnderline
          sx={{
            width: "50px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            height: "45px",
          }}
        >
          {Object.keys(categoryIcons).map((category) => (
            <MenuItem key={category} value={category}>
              {categoryIcons[category]} {category}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          onClick={() => handleSearch()}
          sx={{ margin: "10px 10px 10px 10px" }}
        >
          Search
        </Button>
      </SearchWrapper>
      {searchResults.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        ></div>
      )}
      <EntitiesList
        entityType={searchMode}
        dataUrl={`${apiEndpoints[searchMode]}?search=${
          searchValueRef.current || ""
        }`}
        imgUrl={"imgUR"}
        searchTriggered={searchTriggered && searchButtonClicked} // Check both conditions
      />
    </Container>
  );
};

export default SearchBar;
