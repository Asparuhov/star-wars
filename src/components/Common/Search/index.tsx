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

// Icons for different search categories
const categoryIcons: any = {
  Planets: <PublicIcon />,
  People: <PeopleAltIcon />,
  Starships: <RocketLaunchIcon />,
  Vehicles: <CommuteIcon />,
  Species: <EmojiNatureIcon />,
};

// API endpoints for different search categories
const apiEndpoints: any = {
  People: "https://swapi.dev/api/people/",
  Planets: "https://swapi.dev/api/planets/",
  Species: "https://swapi.dev/api/species/",
  Starships: "https://swapi.dev/api/starships/",
  Vehicles: "https://swapi.dev/api/vehicles/",
};

// Main component for the search bar
const SearchBar: React.FC = () => {
  // State to manage the selected search category
  const [searchMode, setSearchMode] = useState("People");
  // State to store search results
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // Ref to store the search input value
  const searchValueRef = useRef<string | null>(null);
  // State to track whether the search has been triggered
  const [searchTriggered, setSearchTriggered] = useState(false);
  // State to track whether the search button has been clicked
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  // Function to handle the change in search category
  const handleModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchMode(event.target.value as string);
    setSearchButtonClicked(false); // Reset the search button click status
  };

  // Function to handle the search button click
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
  console.log(searchMode);
  // JSX structure for rendering the search bar
  return (
    <Container>
      {/* Styled search bar wrapper */}
      <SearchWrapper>
        {/* Styled input for search */}
        <StyledInputBase
          placeholder={`Search ${searchMode.toLowerCase()}...`}
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => {
            searchValueRef.current = event.target.value;
          }}
        />
        {/* Styled select dropdown for search category */}
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
          {/* Map through category icons to render menu items */}
          {Object.keys(categoryIcons).map((category) => (
            <MenuItem key={category} value={category}>
              {categoryIcons[category]} {category}
            </MenuItem>
          ))}
        </Select>
        {/* Styled search button */}
        <Button
          variant="contained"
          onClick={() => handleSearch()}
          sx={{ margin: "10px 10px 10px 10px" }}
        >
          Search
        </Button>
      </SearchWrapper>
      {/* Conditional rendering of search results */}
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
      {/* EntitiesList component for displaying search results */}
      <EntitiesList
        entityType={searchMode}
        dataUrl={`${apiEndpoints[searchMode]}?search=${
          searchValueRef.current || ""
        }`}
        imgUrl={`https://starwars-visualguide.com/assets/img/${
          searchMode === "People" ? "characters" : searchMode.toLowerCase()
        }`}
        searchTriggered={searchTriggered && searchButtonClicked} // Check both conditions
      />
    </Container>
  );
};

export default SearchBar;

// Styled component for the search bar wrapper
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

// Styled component for the search input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));
