import Home from "./Home";
import People from "./People";
import Planets from "./Planets";
import Starships from "./Starships";
import Favorites from "./Favorites";
import GalacticTrade from "./GalacticTrade";
import DetailedView from "./DetailedView";
import Vehicles from "./Vehicles";
import Species from "./Species";

//Helper function to export pages for cleaner App component
const getPages = () => ({
  Home,
  People,
  Planets,
  Starships,
  Favorites,
  GalacticTrade,
  DetailedView,
  Vehicles,
  Species,
});

export default getPages;
