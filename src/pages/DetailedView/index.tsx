import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailedCard from "components/Common/DetailedCard";
import { CircularProgress } from "@mui/material";

const DetailedView: React.FC = () => {
  const { entity, id } = useParams<{ entity: string; id: string }>();
  const [currentEntity, setCurrentEntity] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://swapi.dev/api${window.location.pathname}`)
      .then((response) => setCurrentEntity(response.data));
  };

  return (
    <>
      {currentEntity ? (
        <DetailedCard
          name={currentEntity.name}
          imageUrl={`https://starwars-visualguide.com/assets/img/${
            entity === "people" ? "characters" : entity
          }/${id}.jpg`}
          data={currentEntity}
        />
      ) : (
        <CircularProgress
          style={{ margin: "100px auto", display: "block" }}
          size={100}
        />
      )}
    </>
  );
};

export default DetailedView;
