import React, { createContext, useContext, useState, ReactNode } from "react";
import { IEntity } from "types/common";

interface EntityContextProps {
  currentEntity: IEntity | null;
  setCurrentEntity: React.Dispatch<React.SetStateAction<any | null>>;
}

const EntityContext = createContext<EntityContextProps | undefined>(undefined);

interface EntityProviderProps {
  children: ReactNode;
}

export const EntityProvider: React.FC<EntityProviderProps> = ({ children }) => {
  const [currentEntity, setCurrentEntity] = useState<IEntity | null>(null);

  return (
    <EntityContext.Provider value={{ currentEntity, setCurrentEntity }}>
      {children}
    </EntityContext.Provider>
  );
};

export const useEntityContext = (): EntityContextProps => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error("useEntityContext must be used within an EntityProvider");
  }
  return context;
};
