import React from "react";
import EntitiesList from "components/Common/EntitiesList";

const imgURL = "https://starwars-visualguide.com/assets/img/planets/";

const PlanetsPage: React.FC = () => {
  return (
    <EntitiesList
      entityType="planets"
      dataUrl="https://swapi.dev/api/planets"
      imgUrl={imgURL}
      fetchDataOnMount={true}
    />
  );
};

export default PlanetsPage;
