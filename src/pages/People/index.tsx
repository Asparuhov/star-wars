import EntitiesList from "components/Common/EntitiesList";

const imgURL = "https://starwars-visualguide.com/assets/img/characters/";

const PeoplePage = () => {
  return (
    <EntitiesList
      entityType="people"
      dataUrl="https://swapi.dev/api/people"
      imgUrl={imgURL}
    />
  );
};

export default PeoplePage;
