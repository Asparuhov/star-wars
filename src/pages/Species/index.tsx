import React from "react";
import EntitiesList from "components/Common/EntitiesList";

const imgURL = "https://starwars-visualguide.com/assets/img/species/";

const SpeciesPage: React.FC = () => {
  return (
    <EntitiesList
      entityType="species"
      dataUrl="https://swapi.dev/api/species"
      imgUrl={imgURL}
    />
  );
};

export default SpeciesPage;
