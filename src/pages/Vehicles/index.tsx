import React from "react";
import EntitiesList from "components/Common/EntitiesList";

const imgURL = "https://starwars-visualguide.com/assets/img/vehicles/";

const VehiclesPage: React.FC = () => {
  return (
    <EntitiesList
      entityType="vehicles"
      dataUrl="https://swapi.dev/api/vehicles"
      imgUrl={imgURL}
      fetchDataOnMount={true}
    />
  );
};

export default VehiclesPage;
