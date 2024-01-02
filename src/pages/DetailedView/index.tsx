import { useEntityContext } from "contexts/entity";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IDetailedViewProps } from "types/common";
import axios from "axios";
import { DetailedCard } from "components/Common/DetailedCard";

const DetailedView: React.FC<IDetailedViewProps> = () => {
  // Use the useParams hook to get the parameters from the URL
  const { id } = useParams<{ id: string }>();
  const { currentEntity, setCurrentEntity } = useEntityContext();
  useEffect(() => {
    if (currentEntity?.id !== id) {
      axios
        .get(`https://swapi.dev/api${window.location.pathname}`)
        .then((res) => setCurrentEntity(res.data.results));
    }
  }, []);

  return (
    <div>
      {currentEntity && (
        <DetailedCard name={currentEntity.name} imageUrl="fasfAS" />
      )}
    </div>
  );
};

export default DetailedView;
