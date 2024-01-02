import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import getPages from "./pages";
import { Header } from "./components/header";
import { EntityProvider } from "contexts/entity";

const App: React.FC = () => {
  const Pages = getPages();
  return (
    <EntityProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Pages.Home} />
          <Route path="/people" Component={Pages.People} />
          <Route path="/planets" Component={Pages.Planets} />
          <Route path="/starships" Component={Pages.Starships} />
          <Route path="/favorites" Component={Pages.Favorites} />
          <Route path="/galactic-trade" Component={Pages.GalacticTrade} />
          <Route path="/people/:id" Component={Pages.DetailedView} />
        </Routes>
      </Router>
    </EntityProvider>
  );
};

export default App;
