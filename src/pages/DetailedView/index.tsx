import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DetailedCard } from "components/Common/DetailedCard";
import { CircularProgress } from "@mui/material";

const DetailedView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entity, setEntity] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://swapi.dev/api${window.location.pathname}`)
      .then((response) => setEntity(response.data));
  };

  return (
    <>
      {entity ? (
        <DetailedCard
          name={entity.name}
          imageUrl={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          data={entity}
        />
      ) : (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      )}
    </>
  );
};

export default DetailedView;
