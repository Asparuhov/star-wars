import React from "react";
import EntitiesList from "components/Common/EntitiesList";

const imgURL = "https://starwars-visualguide.com/assets/img/starships/";

const StarshipsPage: React.FC = () => {
  return (
    <EntitiesList
      entityType="starships"
      dataUrl="https://swapi.dev/api/starships"
      imgUrl={imgURL}
      fetchDataOnMount={true}
    />
  );
};

export default StarshipsPage;
